var port = 6787

document.addEventListener('DOMContentLoaded', function () {
                          var socketId;
                          var mainwin = document;
                          var log = mainwin.getElementById("log");
                          
                          function display(item) {
                                log.appendChild(mainwin.createTextNode(item+"\n"));
                          };
                          
                          chrome.sockets.udp.create({}, function(socketInfo) {
                                                    
                                                    display("Connecting...");
                                                    
                                                    socketId = socketInfo.socketId;
                                                    
                                                    chrome.sockets.udp.onReceive.addListener(function(info) {
                                                                                             if (info.socketId !== socketId)
                                                                                                return;
                                                                                             display(info.data);
                                                                                             });
                                                    
                                                    chrome.sockets.udp.bind(socketId, "0.0.0.0", +(port), function(result) {
                                                                            if (result < 0) {
                                                                                display("Error binding socket.");
                                                                                return;
                                                                            });
                                                    
                                                    display("Connected.");
                                                    
                                                    });
                          
                          display("Log Initialized:");
                          
                          });
