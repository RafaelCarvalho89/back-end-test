import { MongoClient, Collection, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    this.client.close()
    this.client = null
  },

  async ensureConnection (): Promise<void> {
    if (!this.client?.isConnected) await this.connect(this.uri)
  },

  async getCollection (name: string): Promise<Collection> {
    await this.ensureConnection()
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    if (!collection) return {}
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  },

  mapList: (collectionList: any[]): any[] => {
    const mappedCollectionList = []
    for (const collection of collectionList) {
      const mappedCollection = MongoHelper.map(collection)
      mappedCollectionList.push(mappedCollection)
    }
    return mappedCollectionList
  },

  addObjectId: (object: any): any => {
    return Object.assign({}, object, { id: new ObjectId() })
  },

  addObjectIdInObjectList: (objectList: any[]): any[] => {
    const newObjectList = []
    for (const object of objectList) {
      const newObject = Object.assign({}, object, { id: new ObjectId() })
      newObjectList.push(newObject)
    }
    return newObjectList
  },

  insertObjectInDocumentField: (object: any, field: string, document: any): any => {
    if (!document[field]) document[field] = []
    document[field].push(object)
    return document
  },

  async getDocumentById (id: string, collectionName: string): Promise<any> {
    await this.ensureConnection()
    return (this.client.db().collection(collectionName)).findOne({
      _id: new ObjectId(id)
    })
  },

  async findOneByFilter (filter: any, collectionName: string, projection?: any): Promise<any> {
    await this.ensureConnection()
    return (this.client.db().collection(collectionName)).findOne(filter, projection)
  },

  async insertOne (inputData: any, collectionName: string): Promise<any> {
    await this.ensureConnection()
    const result = await (this.client.db().collection(collectionName)).insertOne(inputData)
    return this.map(result.ops[0])
  },

  async updateOne (id: string, updatedData: any, collectionName: string): Promise<any> {
    await this.ensureConnection()
    const { result } = await (this.client.db().collection(collectionName)).updateOne(
      { _id: id },
      { $set: updatedData },
      { upsert: false }
    )
    return result
  },

  async list (collectionName: string): Promise<any> {
    await this.ensureConnection()
    const documentList = await (this.client.db().collection(collectionName)).find().toArray()
    return documentList
  },

  async delete (id: string, collectionName: string): Promise<any|null> {
    await this.ensureConnection()
    const { deletedCount } = await (this.client.db().collection(collectionName)).deleteOne({ _id: id })
    return deletedCount === 1 ? { delete: 'ok' } : {}
  }
}
