console.log("Installing...");

chrome.app.runtime.onLaunched.addListener(function() {
                                          console.log("Loading...");
                                          chrome.app.window.create("display.html", {
                                                                   id: "mainwin",
                                                                   bounds: {
                                                                     width: 680,
                                                                     height: 480
                                                                   }
                                                                   });
                                          console.log("  Loaded.");
                                          });

console.log("  Installed.");
