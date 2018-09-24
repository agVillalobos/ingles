using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Reflection;

namespace FileToMongo
{
    class Program
    {
        static void Main(string[] args)
        {
            // Define request parameters.
            String spreadsheetId = "1aOA2dxd82IykDY2gWPAhXkMVwYkgl5-Yo2xmIHBFXhQ";
            String range = "A1:F164";
            //Obtiene valores del google docs.
            var googleSheets = new GoogleSheets();

            var phrasalVerbs = googleSheets.GetValues(spreadsheetId, range);
            var valuesToInsert = ToVocabulary(phrasalVerbs);

            spreadsheetId = "1A4jYJdzV1QNCo5J2IOpDa5NZ2Y_T8_x58WrYSYlvERM";
            range = "A1:F384";
            var vocabulary = googleSheets.GetValues(spreadsheetId, range);
            valuesToInsert.AddRange(ToVocabulary(vocabulary));

            //Guarda el valor en Mongo.
            var dbName = "English";
            var mongo = new MongoDBExample(dbName);
            mongo.Insert<Vocabulary>("vocabularies", valuesToInsert);


            Console.ReadKey();

        }

        //static List<PhrasalVerb> ToPhrasalVerbs(IList<IList<Object>> values)
        //{
        //    var result = new List<PhrasalVerb>();

        //    foreach (var value in values)
        //    {
        //        if (value == null || value.Count <= 4) continue;
        //        result.Add(new PhrasalVerb()
        //        {
        //            Name = value[0].ToString(),
        //            Synonyms = value[1].ToString(),
        //            Translate = value[2].ToString(),
        //            Examples = value[3].ToString(),
        //            Meanings = value[4].ToString()
        //        });
        //    }

        //    return result;
        //}

        static List<Vocabulary> ToVocabulary(IList<IList<Object>> values)
        {
            var result = new List<Vocabulary>();

            foreach (var value in values)
            {
                if (value == null || value.Count <= 4) continue;
                result.Add(new Vocabulary()
                {
                    Name = value[0].ToString(),
                    Synonyms = value[1].ToString(),
                    Translate = value[2].ToString(),
                    Examples = value[3].ToString(),
                    Meanings = value[4].ToString(),
                    Type = value[5].ToString()
                });
            }

            return result;
        }
    }
}
