var port = 6775;

function formatHTML(inputstring) {
    return inputstring.replace("<", "&lt;").replace(">", "&gt;").replace("&", "&amp;");
};

document.addEventListener('DOMContentLoaded', function () {
                          var socketId;
                          var mainwin = document;
                          var log = mainwin.getElementById("log");
                          
                          function display(item, group) {
                          
                                item = ""+item;
                                var toappend = formatHTML(item)
                          
                                if (!! group) {
                                    console.group(item);
                                    toappend = "<h1>"+toappend+"</h1>";
                                    }
                                else {
                                    console.log(item);
                                    toappend = "<p>"+toappend+"</p>";
                                    };
                          
                                if (group === false) {
                                    console.groupEnd();
                                    };
                          
                                log.innerHTML += toappend;
                          
                            };
                          
                          display("Booting Up...", true);
                          
                          chrome.sockets.udp.create({}, function(socketInfo) {
                                                    
                                                    display("Connecting...", true);
                                                    
                                                    socketId = socketInfo.socketId;
                                                    
                                                    chrome.sockets.udp.bind(socketId, "0.0.0.0", +port, function(result) {
                                                                            if (result < 0) {
                                                                                display("Error binding socket.");
                                                                                return;
                                                                                };
                                                                            });
                                                    
                                                    chrome.sockets.udp.onReceive.addListener(function(info) {
                                                                                             if (info.socketId !== socketId) {
                                                                                                display("Unknown: "+info.data);
                                                                                                }
                                                                                             else {
                                                                                                display("Received: "+info.data);
                                                                                                };
                                                                                             });
                                                    
                                                    display("Connected.", false);
                                                    display("Log Initialized:", true);
                                                    
                                                    });
                        
                        display("Booted Up.", false);
                        
                        });
