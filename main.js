var port = 6775;

document.addEventListener('DOMContentLoaded', function () {
                          var socketId;
                          var mainwin = document;
                          var log = mainwin.getElementById("log");
                          
                          function display(item, group) {
                          
                                item = ""+item;
                                var toappend = mainwin.createTextNode(item);
                          
                                if (!! group) {
                                    console.group(item);
                                    toappend = mainwin.createElement("h1").appendChild(toappend);
                                    }
                                else {
                                    console.log(item);
                                    toappend = mainwin.createElement("p").appendChild(toappend);
                                    };
                          
                                if (group === false) {
                                    console.groupEnd();
                                    };
                          
                                log.appendChild(toappend);
                          
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
                                                    
                                                    });
                        
                        display("Booted Up.", false);
                        display("Log Initialized:", true);
                        
                        });
