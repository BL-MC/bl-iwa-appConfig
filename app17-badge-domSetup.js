                this.siteCanvas = document.createElement("canvas");
                this.cardBodyDiv.appendChild(this.siteCanvas);
                let siteImage = new Image();
                siteImage.src = this.config.image;
                this.siteImage = siteImage;
                this.badges = [];
                this.serialNo = 0;

                let canvasWidth = this.cardBodyDiv.offsetWidth;
                let canvasHeight = Math.round(this.cardBodyDiv.offsetWidth * siteImage.naturalHeight / siteImage.naturalWidth);
                this.siteCanvas.width = canvasWidth;
                this.siteCanvas.height = canvasHeight;

                let siteContext = this.siteCanvas.getContext('2d');
                siteImage.onload = function()
                {
                    siteContext.drawImage(siteImage, 0, 0, canvasWidth, canvasHeight );
                }

                window.addEventListener("resize", event => {this.resize()});

