AFRAME.registerComponent("atoms",{
    init: async function(){
        //creating compund
       var compounds = await this.getCompounds();
       //variable for barecodes
       var barcodes = Object.keys(compounds) ;
        barcodes.map(barcode=>{
            var element = compounds[barcode]
            this.createAtoms(element)
        })
    },
    getCompounds: function(){
        return fetch("js/compundList.json")
        .then(res=>res.json())
        .then(data=>data)
    },
    getElementColors: function(){
        return fetch("js/elementColors.json")
        .then(res=>res.json())
        .then(data=>data)
    },
    createAtoms:async function(element){
        var elementName = element.element_name
        var barcodeValue = element.barecode_value
        var ElectronNum = element.number_of_electrons
        var colors = await this.getElementColors();
        var scene = document.querySelector("#scene")
        var marker = document.createElement("a-marker")
        marker.setAttribute("id", `marker-${barcodeValue}`)
        marker.setAttribute("type", "barcode")
        marker.setAttribute("element_name", elementName)
        marker.setAttribute("value", barcodeValue)
        marker.setAttribute("marker-handler", {})
        scene.appendChild(marker)

        var atom = document.createElement("a-entity")
        atom.setAttribute("id", `${elementName}-${barcodeValue}`)
        marker.appendChild(atom)
        var card = document.createElement("a-entity")
        card.setAttribute("id", `card-${elementName}`)
        card.setAttribute("geometry",{
            primitive:"plane",
            width:1,
            height:1
        })
        card.setAttribute("material", {src:`assets/atom_cards/card_${elementName}.png`})
        card.setAttribute("position", {x:0, y:0, z:0})
        card.setAttribute("rotaion", {x:-90, y:0, z:0})
        atom.appendChild(card)
        var nucleusRadius = 0.2
        var nucleus = document.createElement("a-entity")
        nucleus.setAttribute("id", `Nucleaus-${elementName}`)
        nucleus.setAttribute("geometry", {
            primitive:"shpere",
            radius:nucleusRadius
        })
        nucleus.setAttribute("material", "color",colors[element_name])
        nucleus.setAttribute("position", {x:0,y:1,z:0})
        nucleus.setAttribute("rotation", {x:0,y:0,z:0})

        var nucleusName = document.createElement("a-entity")
        nucleusName.setAttribute("id", `Nuclear-name-${elementName}`)
        nucleusName.setAttribute("text", {
            font:"monoid",
            width:3,
            color:"black",
            align:"center",
            value:elementName
        })
        nucleusName.setAttribute("position", {x:0,y:0.21,z:-0.06})
        nucleusName.setAttribute("rotation", {x:-90,y:0,z:0})
        nucleus.appendChild(nucleusName)
        atom.appendChild(nucleus)

        var compounds = element.compounds
        compounds.map(item=>{
            var compound = document.createElement("a-entity")
            compound.setAttribute("id", `${item.compound_name}-${item.barecode_value}`)
            compound.setAttribute("visible", false)
            marker.appendChild(compound)
            var c_card = document.createElement("a-entity")
        c_card.setAttribute("id", `card-${item.compound_name}`)
        c_card.setAttribute("geometry",{
            primitive:"plane",
            width:1.2,
            height:1.7
        })
        c_card.setAttribute("material", {src:`assets/compound_cards/card_${item.compound_name}.png`})
        c_card.setAttribute("position", {x:0, y:0, z:0.2})
        c_card.setAttribute("rotaion", {x:-90, y:0, z:0})
        compound.appendChild(c_card)

        var posX = 0
        item.elements.map((m, index)=>{
            var nucleus = document.createElement("a-entity")
            nucleus.setAttribute("id", `Nucleaus-${m}`)
        nucleus.setAttribute("geometry", {
            primitive:"shpere",
            radius:0.2
        })
        nucleus.setAttribute("material", "color",colors[m])
        nucleus.setAttribute("position", {x:posX,y:1,z:0})
        posX += 0.35
        compound.appendChild(nucleus)
        var nucleusName = document.createElement("a-entity")
        nucleusName.setAttribute("id", `Nuclear-name-${m}`)
        nucleusName.setAttribute("text", {
            font:"monoid",
            width:3,
            color:"black",
            align:"center",
            value:m
        })
        nucleusName.setAttribute("position", {x:0,y:0.21,z:0})
        nucleusName.setAttribute("rotation", {x:-90,y:0,z:0})
        nucleus.appendChild(nucleusName)
            

        })

        })
    }
})