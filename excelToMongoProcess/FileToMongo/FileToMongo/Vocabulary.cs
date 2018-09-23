using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileToMongo
{
    public class Vocabulary
    {
        public string Name { get; set; }
        public string Synonyms { get; set; }
        public string Translate { get; set; }
        public string Examples { get; set; }
        public string Meanings { get; set; }
        public string Type { get; set; }
    }
}
