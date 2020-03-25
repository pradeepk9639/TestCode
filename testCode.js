var fileSystem = require('fs'), // To read file system
      execSync = require('child_process').execSync; //Read child process
process.stdout.write('User Input : ');

var 
    echo =function(userInput){ //Echo command
        done(userInput); 
    },
    cat = function(fullPath){ //Cat command
        const fileName = fullPath[0];
        fileSystem.readFile(fileName, (err, data) => {
            if (err) throw err;
            console.log(data);
            done(data); 
        });
    }, 
    head = function(fullPath){ // head command
        const fileName = fullPath[0];
        fileSystem.readFile(fileName, (err, data) => {
            if (err) throw err; 
            var text = data.toString('utf8'); 
            var slicedText = text.split('\n').slice(0,10).join('\n'); 
            var bufferText = Buffer.from(slicedText, 'utf8');
            done(bufferText);
        })
    }, 
    tail = function(fullPath){ //tail command
        const fileName = fullPath[0];
        fileSystem.readFile(fileName, (err, data) => {
            if (err) throw err;
            var text = data.toString('utf8');
            var slicedText = text.split('\n').slice(-10).join('\n');
            var bufferText = Buffer.from(slicedText, 'utf8');
            done(bufferText);
        })
    },
    ls = function(){ //ls command
        console.log(execSync('ls', { encoding: 'utf-8' }))
    };

process.stdin.on('data', function(inputData) {
    inputData = inputData.toString().trim();
    commandName(inputData);
}); 

done = function(outputData) {
    process.stdout.write(outputData);
    process.stdout.write('\nUser Input : ');
}
commandName = function(inputData){
    var inputArray = inputData.split(" "),
        command = inputArray[0]; 
    switch (command) {
        case "echo":
            echo(inputArray.slice(1).join(" "));
            break;     
        case "cat":
            cat(inputArray.slice(1)); 
            break;      
        case "head":
            head(inputArray.slice(1));
            break; 
        case "tail":
            tail(inputArray.slice(1));
        case "ls":
            ls(inputArray.slice(1));
        default: 
            process.stdout.write('Incorrect command');
        }
}


