                this.siteCanvas = document.createElement("canvas");
                this.cardBodyDiv.appendChild(this.siteCanvas);
                let siteImage = new Image();
                siteImage.src = this.config.image;
                this.siteImage = siteImage;
                this.stations = [];
                this.stationEditIndex = -1;

                let canvasWidth = this.cardBodyDiv.offsetWidth;
                let canvasHeight = Math.round(this.cardBodyDiv.offsetWidth * siteImage.naturalHeight / siteImage.naturalWidth);
                this.siteCanvas.width = canvasWidth;
                this.siteCanvas.height = canvasHeight;

                let siteContext = this.siteCanvas.getContext('2d');
                siteImage.onload = function()
                {
                    siteContext.drawImage(siteImage, 0, 0, canvasWidth, canvasHeight );
                }

                this.siteCanvas.onmousedown = event => {this.onMouseDown(event)};
                this.siteCanvas.onmousemove = event => {this.onMouseMove(event)};
                window.addEventListener("resize", event => {this.resize()});
