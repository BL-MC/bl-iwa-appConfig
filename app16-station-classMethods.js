            trayUpdate(trays)
            {
                if (this.stationEditIndex >= 0) return;
                this.stations = JSON.parse(JSON.stringify(trays[0].stationSummary.value));
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
                for (let istation in this.stations)
                {
                    let color = this.config.station_bg;
                    let textColor = this.config.station_txt;
                    if (this.stations[istation].lastUpdate > this.config.stationOffline)
                    {
                        color = this.config.stationOffline_bg;
                        textColor = this.config.stationOffline_txt;
                    }    
                    if (Number(istation) == this.stationEditIndex)
                    {
                        color = this.config.stationEdit_bg;
                        textColor = this.config.stationEdit_txt;
                    }    
                    this.drawStation(this.stations[istation], color, textColor, siteContext);
                }   
               
            }
            onMouseDown(e)
            {
                if (this.stationEditIndex >= 0)
                {
                    let payload = {'cube': 'xpos', 'value':this.stations[this.stationEditIndex].xpos};
                    let actionMsg = 
                        {
                            topic   : this.app.box + '/tray/bl-iwa-station/' +  this.stations[this.stationEditIndex].serialNo.toString() + '/setting/setting',
                            payload : payload
                        };
                    this.app.sendActionMsg('setting','setting',actionMsg);
                    payload = {'cube': 'ypos', 'value':this.stations[this.stationEditIndex].ypos};
                    actionMsg = 
                        {
                            topic   : this.app.box + '/tray/bl-iwa-station/' +  this.stations[this.stationEditIndex].serialNo.toString() + '/setting/setting',
                            payload : payload
                        };
                    this.app.sendActionMsg('setting','setting',actionMsg);
                    this.stationEditIndex = -1;
                    this.resize();
                }
                else
                {
                    let xscale = (this.config.imageCoords.xBotRight - this.config.imageCoords.xTopLeft);
                    let yscale = (this.config.imageCoords.yBotRight - this.config.imageCoords.yTopLeft);
                    let rad = Math.round(this.siteCanvas.width * this.config.badgeSize / 100);
                    for (let istation in this.stations)
                    {
                        let xcoord = this.siteCanvas.width  * (this.stations[istation].xpos - this.config.imageCoords.xTopLeft) / xscale;
                        let ycoord = this.siteCanvas.height * (this.stations[istation].ypos - this.config.imageCoords.yTopLeft) / yscale; 
                        let distance =  Math.sqrt((xcoord - e.offsetX) *  (xcoord - e.offsetX) +  (ycoord - e.offsetY) *  (ycoord - e.offsetY) );
                        if (distance < rad)
                        {
                            this.stationEditIndex = Number(istation);
                            this.resize();
                        }      
                    }   
                }
            }
            onMouseMove(e)
            {
                if (this.stationEditIndex < 0) return;
                let xscale = (this.config.imageCoords.xBotRight - this.config.imageCoords.xTopLeft);
                let yscale = (this.config.imageCoords.yBotRight - this.config.imageCoords.yTopLeft);
                this.stations[this.stationEditIndex].xpos  = (e.offsetX * xscale / this.siteCanvas.width)  + this.config.imageCoords.xTopLeft;
                this.stations[this.stationEditIndex].ypos  = (e.offsetY * yscale / this.siteCanvas.height) + this.config.imageCoords.yTopLeft;
                this.stations[this.stationEditIndex].xpos  = Math.round(1000 * this.stations[this.stationEditIndex].xpos) / 1000;
                this.stations[this.stationEditIndex].ypos  = Math.round(1000 * this.stations[this.stationEditIndex].ypos) / 1000;
                this.resize();

            }
            drawStation(station, color, textColor, context)
            {
                let xcoord = (station.xpos - this.config.imageCoords.xTopLeft) / (this.config.imageCoords.xBotRight - this.config.imageCoords.xTopLeft);
                xcoord = Math.round(this.siteCanvas.width * xcoord);
                let ycoord = (station.ypos - this.config.imageCoords.yTopLeft) / (this.config.imageCoords.yBotRight - this.config.imageCoords.yTopLeft);
                ycoord = Math.round(this.siteCanvas.height * ycoord);

                let rad = Math.round(this.siteCanvas.width * this.config.badgeSize / 100);
                let xtextOff = Math.round(rad  * 0.567);
                let ytextOff = Math.round(rad  * 0.733);


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
