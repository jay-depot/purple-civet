This is where JSON objects describing your characters will go.
Structure should look like this: 

{
  "name": "John Smith",
  "sprites": {
    "happy": "john/happy.png",
    "sad": "john/sad.png",
    "crying": "john/cry.png"
  }
}

Each file should be [name].json, where [name] is the name used internally to fetch this character data for 
custom scripts and scene descriptions in each of your story nodes.
