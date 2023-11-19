# Setup

`npm install`

# Creating test-file

`npx ts-node generate.ts [filename] [size in MB]`
example:
`npx ts-node generate.ts ./test.txt 16`

Will also produce an output of an example key somewhe in the middle of the file

# Running app

`npx ts-node app.ts [filename] [searchkey]`
example
`npx ts-node app.ts sane-test.txt 200`

# Contents
* app.ts - the search part of application
* appConfig.ts - the settings of application
* reader.ts - wrappers for node reqdable & writable streams
* generate.ts - test file generator
