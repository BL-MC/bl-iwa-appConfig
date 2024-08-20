            trayUpdate(trays)
            {
                
                this.badges = JSON.parse(JSON.stringify(trays[1].badgeSummary.value));
                for (let ibadge in this.badges)
                {
                    let xcoord = (this.badges[ibadge].xpos - this.config.imageCoords.xTopLeft) / (this.config.imageCoords.xBotRight - this.config.imageCoords.xTopLeft);
                    let ycoord = (this.badges[ibadge].ypos - this.config.imageCoords.yTopLeft) / (this.config.imageCoords.yBotRight - this.config.imageCoords.yTopLeft);
                    if (xcoord < 0) xcoord = 0.05;
                    if (xcoord > 1) xcoord = 0.95;
                    if (ycoord < 0) ycoord = 0.05;
                    if (ycoord > 1) ycoord = 0.95;
                    this.badges[ibadge].xpos = xcoord * (this.config.imageCoords.xBotRight - this.config.imageCoords.xTopLeft) + this.config.imageCoords.xTopLeft;
                    this.badges[ibadge].ypos = ycoord * (this.config.imageCoords.yBotRight - this.config.imageCoords.yTopLeft) + this.config.imageCoords.yTopLeft;
                }
                this.stations = trays[0].stations.value;
                this.stations.sort((a, b) => b.rssi - a.rssi);
                this.serialNo = trays[0].serialNo.value;
                this.resize();
 
            }
            resize()
            {
                let canvasWidth = this.cardBodyDiv.offsetWidth;
                let canvasHeight = Math.round(this.cardBodyDiv.offsetWidth * this.siteImage.naturalHeight / this.siteImage.naturalWidth);
                this.siteCanvas.width = canvasWidth;
                this.siteCanvas.height = canvasHeight;
                let siteContext = this.siteCanvas.getContext('2d');
                siteContext.drawImage(this.siteImage, 0, 0, canvasWidth, canvasHeight );
                if (this.badges.length < 1) return;
                let badge = null;
                for (let ibadge in this.badges)
                {
                    if (this.badges[ibadge].serialNo == this.serialNo) badge = this.badges[ibadge];
                }
                for (let istation in this.stations)
                {
                    let lineColor = 'black';
                    if (Number(istation)  == 0) lineColor = 'red';
                    if (Number(istation)  == 1) lineColor = 'green';
                    if (Number(istation)  == 2) lineColor = 'blue';
                    if (Number(istation) < 3) this.drawStation(this.stations[istation], badge, lineColor, siteContext);
                }
                this.drawBadge(badge, siteContext);
               
            }
            drawBadge(badge, context)
            {
                let xcoord = (badge.xpos - this.config.imageCoords.xTopLeft) / (this.config.imageCoords.xBotRight - this.config.imageCoords.xTopLeft);
                xcoord = Math.round(this.siteCanvas.width * xcoord);
                let ycoord = (badge.ypos - this.config.imageCoords.yTopLeft) / (this.config.imageCoords.yBotRight - this.config.imageCoords.yTopLeft);
                ycoord = Math.round(this.siteCanvas.height * ycoord);
                let rad = Math.round(this.siteCanvas.width * this.config.badgeSize / 100);
                let xtextOff = Math.round(rad / 2);
                let ytextOff = Math.round(rad / 3);

                let xUserTextOff = Math.round(rad);
                let yUserTextOff = Math.round(2.0 * rad);

                let button = false;
                let move   = false
                let charge = false
                let auth   = false
                let update = false

                if ( (badge.statusCode & 1)         > 0) button = true;
                if (((badge.statusCode & 2)  >>> 1) > 0) move   = true
                if (((badge.statusCode & 4)  >>> 2) > 0) charge = true;
                if (((badge.statusCode & 8)  >>> 3) > 0) auth   = true;
                if (((badge.statusCode & 16) >>> 4) > 0) update = true;

                let color = this.config.charge_bg;
                let textColor = this.config.charge_txt

                if (!charge && !auth)
                {
                    color = this.config.noAuth_bg;
                    textColor = this.config.noAuth_txt;
                }
                if (!charge &&  auth) 
                {
                    color = this.config.auth_bg;
                    textColor = this.config.auth_txt;
                }
                if (button) 
                {
                    color = this.config.button_bg;
                    textColor = this.config.button_txt;
                }
                if (move)   
                {
                    color = this.config.move_bg;
                    textColor = this.config.move_txt;
                }
                if (update) 
                {
                    color = this.config.update_bg;
                    textColor = this.config.update_txt;
                }

                context.beginPath();
                context.arc(xcoord, ycoord, rad, 0, 2 * Math.PI);
                context.fillStyle = color;
                context.fill();

                context.font = rad.toString() + "px Arial";
                context.fillStyle = textColor;
                context.fillText(badge.serialNo.toString(),xcoord - xtextOff,ycoord + ytextOff);

                if (!auth) return;
                context.fillStyle = color;
                context.fillText(badge.user,xcoord - xUserTextOff,ycoord + yUserTextOff);

            }
            drawStation(station,badge, lineColor, context)
            {
                let badgeXcoord = (badge.xpos - this.config.imageCoords.xTopLeft) / (this.config.imageCoords.xBotRight - this.config.imageCoords.xTopLeft);
                badgeXcoord = Math.round(this.siteCanvas.width * badgeXcoord);
                let badgeYcoord = (badge.ypos - this.config.imageCoords.yTopLeft) / (this.config.imageCoords.yBotRight - this.config.imageCoords.yTopLeft);
                badgeYcoord = Math.round(this.siteCanvas.height * badgeYcoord);

                let xcoord = (station.xpos - this.config.imageCoords.xTopLeft) / (this.config.imageCoords.xBotRight - this.config.imageCoords.xTopLeft);
                xcoord = Math.round(this.siteCanvas.width * xcoord);
                let ycoord = (station.ypos - this.config.imageCoords.yTopLeft) / (this.config.imageCoords.yBotRight - this.config.imageCoords.yTopLeft);
                ycoord = Math.round(this.siteCanvas.height * ycoord);

                context.beginPath(); 
                context.moveTo(badgeXcoord, badgeYcoord); 
                context.lineTo(xcoord, ycoord); 
                context.lineWidth = 5;
                context.strokeStyle = lineColor;
                context.stroke(); 

                let rad = Math.round(this.siteCanvas.width * this.config.badgeSize / 100);
                let xtextOff = Math.round(rad  * 0.567);
                let ytextOff = Math.round(rad  * 0.733);

                let color = this.config.station_bg;
                let textColor = this.config.station_txt;
                let path=new Path2D();
                path.moveTo(xcoord - rad, ycoord + rad);
                path.lineTo(xcoord + rad, ycoord + rad);
                path.lineTo(xcoord, ycoord - rad);
                path.lineTo(xcoord - rad, ycoord + rad);
                context.fillStyle = color;
                context.fill(path);


                context.font = rad.toString() + "px Arial";
                context.fillStyle = textColor;
                context.fillText(station.serialNo.toString(),xcoord - xtextOff,ycoord + ytextOff);
            }

