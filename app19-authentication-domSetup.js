                let inLineTable = document.createElement("table");
                this.cardBodyDiv.appendChild(inLineTable);
                inLineTable.setAttribute("width", "100%");

                let inLineRow  = document.createElement("tr");
                inLineTable.appendChild(inLineRow);

                let labelColumn  = document.createElement("td");
                inLineRow.appendChild(labelColumn);
                labelColumn.setAttribute("class", "cubeRowParameterView-label-column");

                let labelSpan  = document.createElement("span");
                labelColumn.appendChild(labelSpan);
                labelSpan.innerHTML = "Badge Serial No.";

                let widgetColumn = document.createElement("td");
                inLineRow.appendChild(widgetColumn);
                widgetColumn.setAttribute("class", "cubeRowParameterView-widget-column-1");
                
                this.badgeSerialNoSpan  = document.createElement("span");
                widgetColumn.appendChild(this.badgeSerialNoSpan);
                this.badgeSerialNoSpan.setAttribute("class", "numberReadCube-span");
                this.badgeSerialNoSpan.innerHTML = "?";

                inLineRow  = document.createElement("tr");
                inLineTable.appendChild(inLineRow);

                labelColumn  = document.createElement("td");
                inLineRow.appendChild(labelColumn);
                labelColumn.setAttribute("class", "cubeRowParameterView-label-column");

                labelSpan  = document.createElement("span");
                labelColumn.appendChild(labelSpan);
                labelSpan.innerHTML = "Current User";

                widgetColumn = document.createElement("td");
                inLineRow.appendChild(widgetColumn);
                widgetColumn.setAttribute("class", "cubeRowParameterView-widget-column-1");
                
                this.currentUserSpan  = document.createElement("span");
                widgetColumn.appendChild(this.currentUserSpan);
                this.currentUserSpan.setAttribute("class", "numberReadCube-span");
                this.currentUserSpan.innerHTML = "?";

                inLineTable = document.createElement("table");
                this.cardBodyDiv.appendChild(inLineTable);
                inLineTable.setAttribute("width", "100%");

                inLineRow  = document.createElement("tr");
                inLineTable.appendChild(inLineRow);

                widgetColumn = document.createElement("td");
                inLineRow.appendChild(widgetColumn);
                widgetColumn.style.width = "100%";
			    widgetColumn.style.align = "center";
			    widgetColumn.style.textAlign = "center";
			    widgetColumn.style.fontSize= "150%";
                widgetColumn.style.paddingTop = "20px";
                widgetColumn.style.paddingBottom = "20px";
                widgetColumn.style.paddingLeft = "20%";
                widgetColumn.style.paddingRight = "20%";

                this.authorizeButton = document.createElement('button');
                widgetColumn.appendChild(this.authorizeButton);
                this.authorizeButton.classList.add("btn");
                this.authorizeButton.classList.add("btn-block");
                this.authorizeButton.style.fontSize = "100%";
                this.authorizeButton.style.color = "black";
                this.authorizeButton.style.backgroundColor = "red";
                this.authorizeButton.style.paddingTop = "20px";
                this.authorizeButton.style.paddingBottom = "20px";
                this.authorizeButton.innerHTML = 'Authorize';
                this.authorizeButton.onclick = event => {this.authorize()};
                this.authorizeButton.disabled = true;
