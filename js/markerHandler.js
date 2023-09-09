var A = ["H", "Li", "Na", "K"]
var B = ["F", "Cl", "Br", "I"]
var C = ["O", "S", "Se"]
var elements = []
AFRAME.registerComponent("marker-handler",{
    init: async function(){
        var compounds = await this.getCompounds();
        this.el.addEventListener("markerFound", ()=>{
            var element_Name = this.el.getAttribute("element_name")
            var barcode_Value = this.el.getAttribute("value")
            elements.push({element_name:element_Name, barcode_value:barcode_Value})
            compounds[barcode_Value]["compounds"].map(item=>{
            var Compound = document.querySelector(`#${item.compound_name}-${barcode_Value}`)
            Compound.setAttribute("visible", false) })
            var atom = document.querySelector(`#${element_Name}-${barcode_Value}`)
            atom.setAttribute("visible", true)
    })
    this.el.addEventListener("markerLost", ()=>{
        var element_Name = this.el.getAttribute("element_name")
        var index = elements.findIndex(x=>x.element_name === element_Name)
        if (index>-1) {
            elements.splice(index,1)
        }
    })
    },
    tick: function() {
        if (elements.length>1){
            var messageText = document.querySelector("#message-text")
            var length = elements.length
            var distance = null
            var compound = this.getCompound();
            if (length === 2){
                var marker1 = document.querySelector(`#marker-${elements[0].barcode_value}`)
                var marker2 = document.querySelector(`#marker-${elements[1].barcode_value}`)
                distance = this.getDistance(marker1, marker2);
                if (distance < 1.25){
                    if (compound!==undefined){
                        this.showCompound(compound);
                    }
                    else{
                        messageText.setAttribute("visible", true)
                    }
                }
                else{
                    messageText.setAttribute("visible", false)
                }
            }
            if (length === 3){
                var marker1 = document.querySelector(`#marker-${elements[0].barcode_value}`)
                var marker2 = document.querySelector(`#marker-${elements[1].barcode_value}`)
                var marker3 = document.querySelector(`#marker-${elements[2].barcode_value}`)
                distance1 = this.getDistance(marker1, marker2);
                distance2 = this.getDistance(marker1, marker3);
                if (distance1 < 1.25 && distance2 < 1.25){
                    if (compound!==undefined){
                        var barcode_value = elements[0].barcode_value
                        this.showCompound(compound,barcode_value);
                    }
                    else{
                        messageText.setAttribute("visible", true)
                    }
                }
                else{
                    messageText.setAttribute("visible", false)
                }
            }
        }
    },
    getDistance: function(marker1, marker2){
        return marker1.object3D.position.distanceTo(marker2.object3D.position)
    },
    getCompound: function(){
    for(var i of elements){
        if (A.includes(i.element_name)){
            var compound = el.element_name
            for(var j of elements){
                if (B.includes(j.element_name)){
                    compound += j.element_name
                    return{
                        name:compound, value:el.barcode_value
                    }
                }
                if (C.includes(j.element_name)){
                    var count = this.countOccurence(elements, el.element_name)
                    if(count > 1){
                        compound += count+j.element_name
                        return{
                            name:compound, value:j.barcode_value
                        }
                    }
                    
                }
            }
        }
    }        
    }, 
    getCompounds: function(){
        return fetch("js/compundList.json")
        .then(res=>res.json())
        .then(data=>data)
    },
    showCompound: function(compound){
            elements.map(item=>{
            var c = document.querySelector(`#${item.compound_name}-${barcode_Value}`)
            c.setAttribute("visible", false)
        })
        var comp = document.querySelector(`#${compound.name}-${compound.value}`)
        comp.setAttribute("visible", true)
    }

}) 