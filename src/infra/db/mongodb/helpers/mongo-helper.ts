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

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected) await this.connect(this.uri)
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    if (!collection) return {}
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
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

  async getDocumentById (id: string, collectionName: string): Promise<any|null> {
    if (!this.client?.isConnected) await this.connect(this.uri)
    const documentFound = await (this.client.db().collection(collectionName)).findOne({
      _id: id
    })
    return documentFound || null
  },

  async getById (id: string, collection: Collection): Promise<any> {
    return await collection.findOne({ _id: id })
  },

  async updateOne (collection: Collection, id: string, updatedContent: any): Promise<any> {
    return await collection.updateOne(
      { _id: id },
      { $set: updatedContent },
      { upsert: true }
    )
  }
}
