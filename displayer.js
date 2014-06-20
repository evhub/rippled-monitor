document.addEventListener('DOMContentLoaded', function () {
                          var socketId;
                          var mainwin = document;
                          var log = mainwin.getElementById("log");

                          function display(item) {
                                log.appendChild(mainwin.createTextNode(item+"\n"));
                          };

                          chrome.sockets.udp.create({}, function(socketInfo) {
                                                    socketId = socketInfo.socketId;
                                                    });

                          display("Log Initialized:");

                          chrome.sockets.udp.onReceive.addListener(function(info) {
                                                                   if (info.socketId !== socketId)
                                                                   return;
                                                                   display(info.data);
                                                                   console.log(info.data);
                                                                   });
                          });
