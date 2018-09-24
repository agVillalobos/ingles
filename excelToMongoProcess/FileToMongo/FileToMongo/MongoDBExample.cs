using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB;

namespace FileToMongo
{
    public class MongoDBExample
    {
        private MongoClient MongClient { get; }
        private IMongoDatabase MongoDB { get; }

        public MongoDBExample(string dbName)
        {
            MongClient = new MongoClient("mongodb://127.0.0.1:27017");
            //Get Database and Collection  
            MongoDB = MongClient.GetDatabase(dbName);

        }

        public void Insert<T>(string documentName, List<T> values)
        {
            var bDocument = MongoDB.GetCollection<BsonDocument>(documentName);

            //CREATE  
            
            
            foreach (var v in values)
            {
                BsonDocument bsondDocument = new BsonDocument();
                var valuesToInsert = new List<BsonElement>();
                var members = typeof(T).GetProperties();
                foreach (var member in members)
                {
                    var val = v.GetType().GetProperty(member.Name).GetValue(v, null);
                    valuesToInsert.Add(new BsonElement(member.Name.ToLower(), val.ToString()));
                }

                bsondDocument.AddRange(valuesToInsert);

                bDocument.InsertOne(bsondDocument);
            }
            
        }

        public void Update(string documentName, string fieldUpdated, string valueUpdated, string fieldOld, string valueOld)
        {
            var bsonDocument = MongoDB.GetCollection<BsonDocument>(documentName);

            //UPDATE  
            BsonDocument updateBsonDocument = new BsonDocument();
            updateBsonDocument.Add(new BsonElement(fieldUpdated, valueUpdated));

            BsonDocument findDoc = new BsonDocument(new BsonElement(fieldOld, valueOld));

            var updateDoc = bsonDocument.FindOneAndReplace(findDoc, updateBsonDocument);

            Console.WriteLine(updateDoc);
        }

        public void Delete(string documentName, string field, string value)
        {
            var bsonDocument = MongoDB.GetCollection<BsonDocument>(documentName);
            BsonDocument findAnotherPersonDoc = new BsonDocument(new BsonElement(field, value));

            bsonDocument.FindOneAndDelete(findAnotherPersonDoc);
        }

        public List<BsonDocument> GetValues(string documentName)
        {
            var bsonDocument = MongoDB.GetCollection<BsonDocument>(documentName);
            var resultDoc = bsonDocument.Find(new BsonDocument()).ToList();
            foreach (var item in resultDoc)
            {
                Console.WriteLine(item.ToString());
            }

            return resultDoc;
        }

        public void Example()
        {
            try
            {
                MongoClient dbClient = new MongoClient("mongodb://127.0.0.1:27017");

                //Database List  
                var dbList = dbClient.ListDatabases().ToList();

                Console.WriteLine("The list of databases are :");
                foreach (var item in dbList)
                {
                    Console.WriteLine(item);
                }

                Console.WriteLine("\n\n");

                //Get Database and Collection  
                var db = dbClient.GetDatabase("test");
                var collList = db.ListCollections().ToList();
                Console.WriteLine("The list of collections are :");
                foreach (var item in collList)
                {
                    Console.WriteLine(item);
                }

                var things = db.GetCollection<BsonDocument>("things");

                //CREATE  
                BsonElement personFirstNameElement = new BsonElement("PersonFirstName", "Sankhojjal");

                BsonDocument personDoc = new BsonDocument();
                personDoc.Add(personFirstNameElement);
                personDoc.Add(new BsonElement("PersonAge", 23));

                things.InsertOne(personDoc);

                //UPDATE  
                BsonElement updatePersonFirstNameElement = new BsonElement("PersonFirstName", "Souvik");

                BsonDocument updatePersonDoc = new BsonDocument();
                updatePersonDoc.Add(updatePersonFirstNameElement);
                updatePersonDoc.Add(new BsonElement("PersonAge", 24));

                BsonDocument findPersonDoc = new BsonDocument(new BsonElement("PersonFirstName", "Sankhojjal"));

                var updateDoc = things.FindOneAndReplace(findPersonDoc, updatePersonDoc);

                Console.WriteLine(updateDoc);

                //DELETE  
                BsonDocument findAnotherPersonDoc = new BsonDocument(new BsonElement("PersonFirstName", "Sourav"));

                things.FindOneAndDelete(findAnotherPersonDoc);

                //READ  
                var resultDoc = things.Find(new BsonDocument()).ToList();
                foreach (var item in resultDoc)
                {
                    Console.WriteLine(item.ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
