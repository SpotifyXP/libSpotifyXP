class libSpotifyXP {
    constructor(ip) {
        this.ip = ip;
    }

    doLogin = async function (username, password, whenSuccessfull, whenFailed) {
        var u = await this.sha512(username);
        var p = await this.sha512(password);
        if (!whenFailed) {
            whenFailed = null;
        }
        if (!whenSuccessfull) {
            whenSuccessfull = null;
        }
        this.makeRequest("api.initlogin", "username=" + u + "&password=" + p, whenSuccessfull, whenFailed);
    }

    doAuthenticate = async function (username, password, whenSuccessfull, whenFailed) {
        var u = await this.sha512(username);
        var p = await this.sha512(password);
        if (!whenFailed) {
            whenFailed = null;
        }
        if (!whenSuccessfull) {
            whenSuccessfull = null;
        }
        this.makeRequest("api.authenticate", "username=" + u + "&password=" + p, whenSuccessfull, whenFailed);
    }

    doAuthenticateInsecure = function (username, password, whenSuccessfull, whenFailed) {
        this.makeRequest("api.authenticateinsecure", "username=" + username + "&password=" + password, whenSuccessfull, whenFailed);
    }

    doIpLogout = function () {
        this.makeRequest("api.iplogout", "");
    }

    doLogout = function () {
        this.makeRequest("api.logout", "");
    }

    getLoginStatus = function () {
        this.makeRequest("api.getloginstatus", "");
    }

    getKey = function (whenSuccessfull, whenFailed) {
        if (!whenFailed) {
            whenFailed = null;
        }
        if (!whenSuccessfull) {
            whenSuccessfull = null;
        }
        this.makeRequest("api.getkey", "", whenSuccessfull, whenFailed);
    }

    getAPI = function () {
        var ip = this.ip;
        return new class {
            getMetadata = function (whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.getmetadata", "", whenSuccessfull, whenFailed);
            }

            playpause = function (whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.playpause", "", whenSuccessfull, whenFailed);
            }

            next = function (whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.next", "", whenSuccessfull, whenFailed);
            }

            previous = function (whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.previous", "", whenSuccessfull, whenFailed);
            }

            load = function (uri, whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.load", "uri=" + uri, whenSuccessfull, whenFailed);
            }

            loadPlay = function (uri, whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.loadplay", "uri=" + uri, whenSuccessfull, whenFailed);
            }

            getVolume = function (whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.getvolume", "", whenSuccessfull, whenFailed);
            }

            setVolume = function (volume, whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.setvolume", "volume=" + volume, whenSuccessfull, whenFailed);
            }

            volumeUp = function (whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.volumeup", "", whenSuccessfull, whenFailed);
            }

            volumeDown = function (whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.volumedown", "", whenSuccessfull, whenFailed);
            }

            currentTime = function (whenSuccessfull, whenFailed) {
                if (!whenFailed) {
                    whenFailed = null;
                }
                if (!whenSuccessfull) {
                    whenSuccessfull = null;
                }
                this.makeRequest("player.currenttime", "", whenSuccessfull, whenFailed);
            }

            makeRequest = function (method, parameters, whenSuccessfull, whenFailed) {
                var xmlhttp;
                if (window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest();
                } else {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState != 4) {
                        return;
                    }
                    if (xmlhttp.status == 200) {
                        var res = xmlhttp.responseText;
                        try {
                            if (!whenSuccessfull || whenSuccessfull != null) {
                                whenSuccessfull.call(null, res);
                            }
                        } catch (e) {}
                        resolve(res);
                    } else {
                        var res = xmlhttp.responseText;
                        try {
                            if (!whenFailed || whenFailed != null) {
                                whenFailed.call(null, res);
                            }
                        } catch (e) {}
                        resolve(res);
                    }
                }
                var url;
                if (!parameters) {
                    url = "http://" + ip + ":4090?method=" + method;
                } else {
                    url = "http://" + ip + ":4090?method=" + method + "&" + parameters;
                }
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
        };
    }

    sha512 = function (str) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
                    return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
                }));
            }, 2000)
        })
    }

    makeRequest = function (method, parameters, whenSuccessfull, whenFailed) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState != 4) {
                return;
            }
            if (xmlhttp.status == 200) {
                var res = xmlhttp.responseText;
                try {
                    if (!whenSuccessfull || whenSuccessfull != null) {
                        whenSuccessfull.call(null, res);
                    }
                } catch (e) {}
                resolve(res);
            } else {
                var res = xmlhttp.responseText;
                try {
                    if (!whenFailed || whenFailed != null) {
                        whenFailed.call(null, res);
                    }
                } catch (e) {}
                resolve(res);
            }
        }
        var url;
        if (!parameters) {
            url = "http://" + this.ip + ":4090?method=" + method;
        } else {
            url = "http://" + this.ip + ":4090?method=" + method + "&" + parameters;
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}