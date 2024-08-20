            trayUpdate(trays)
            {
                this.badgeSerialNoSpan.innerHTML = trays[1].serialNo.value.toString();
                this.adminTray = JSON.parse(JSON.stringify(trays[0]));
                this.badgeTray = JSON.parse(JSON.stringify(trays[1]));
                if (this.badgeTray.auth.value > 0)
                {
                    this.currentUserSpan.innerHTML = this.badgeTray.user.value;
                    this.authorizeButton.disabled = true; 
                }
                else
                {
                    this.currentUserSpan.innerHTML = "none";
                    this.authorizeButton.disabled = false; 
                }
                console.log(trays[1].user.value);
            }
            authorize()
            {
                this.authorizeButton.disabled = true; 
                let payload = {"cube": "user", "value":this.app.getCookie("Username")};
                let actionMsg = 
                    {
                        topic   : this.app.box + "/tray/" +  this.badgeTray.type + "/" +  this.badgeTray.name + "/setting/setting",
                        payload : payload
                    };
                this.app.sendActionMsg("setting","setting",actionMsg);

                payload = {"cube": "authorizeBadge", "value":this.badgeTray.serialNo.value};
                actionMsg = 
                    {
                        topic   : this.app.box + "/tray/" +  this.adminTray.type + "/" +  this.adminTray.name + "/setting/setting",
                        payload : payload
                    };
                this.app.sendActionMsg("setting","setting",actionMsg);
            }
