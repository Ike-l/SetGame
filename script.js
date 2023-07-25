let cardImages = {}
let cards = []
let searchColour
let searchNumber
let searchShape
let searchShading

function preload() {
    for (let colour of convertorsInverse.colour) {
        for (let number of convertorsInverse.number) {
            for (let shape of convertorsInverse.shape) {
                for (let shading of convertorsInverse.shading) {
                    let imageName = `Cards/${colour}_${shape}_${number}_${shading}.png`
                    console.log(imageName)
                    cardImages[imageName] = loadImage(imageName)
                }
            }
        }
    }
}

function setup() {
    leftSideDiv = select(".left-side")
    rightSideDiv = select(".right-side")
    mainDiv = select(".main")

    searchColour = createSelect("Search")
    searchColour.parent(leftSideDiv)
    searchColour.option("Purple")
    searchColour.option("Green")
    searchColour.option("Red")

    searchNumber = createSelect("Search")
    searchNumber.parent(leftSideDiv)
    searchNumber.option("1")
    searchNumber.option("2")
    searchNumber.option("3")

    searchShape = createSelect("Search")
    searchShape.parent(leftSideDiv)
    searchShape.option("Oval")
    searchShape.option("Squiggle")
    searchShape.option("Diamond")

    searchShading = createSelect("Search")
    searchShading.parent(leftSideDiv)
    searchShading.option("Outlined")
    searchShading.option("Striped")
    searchShading.option("Solid")

    const searchBn = createButton("Add")
    searchBn.parent(rightSideDiv)
    searchBn.mousePressed(addCard)

    const emptyCardsBn = createButton("Empty")
    emptyCardsBn.parent(rightSideDiv)
    emptyCardsBn.mousePressed(emptyCard)

    const findSetsBn = createButton("Find Sets")
    findSetsBn.parent(rightSideDiv)
    findSetsBn.mousePressed(findSets)

    const logCardsBn = createButton("Console Log Cards")
    logCardsBn.parent(rightSideDiv)
    logCardsBn.mousePressed(function() {console.log(cards)})

    const clearLog = createButton("Clear output")
    clearLog.parent(rightSideDiv)
    clearLog.mousePressed(clearOutput)

    const testBn = createButton("Test")
    testBn.parent(rightSideDiv)
    testBn.mousePressed(testingFunc)


    const canvas = createCanvas(mainDiv.width, mainDiv.height)
    canvas.parent(mainDiv)
    canvas.margin
    background(255)
    windowResized()

}

function testingFunc() {
    cards = [
        new Card("Purple", "1", "Oval", "Outlined"),
        new Card("Purple", "2", "Oval", "Striped"),
        new Card("Purple", "3", "Oval", "Solid"),
        new Card("Green", "1", "Squiggle", "Outlined"),
        new Card("Green", "2", "Squiggle", "Striped"),
        new Card("Green", "3", "Squiggle", "Solid"),
        new Card("Red", "1", "Diamond", "Outlined"),
        new Card("Red", "2", "Diamond", "Striped"),
        new Card("Red", "3", "Diamond", "Solid"),
        new Card("Purple", "1", "Squiggle", "Outlined"),
        new Card("Green", "2", "Diamond", "Striped"),
        new Card("Red", "3", "Oval", "Solid")
    ]
}

function clearOutput() {
    const output = select("#output")
    output.html("<h2>Output:</h2>")
}

function displaySet(arg) {
    const output = select("#output")
    output.html(arg.length==0 ? "<br>No set found" : formatSet(arg), true)
}

function formatSet(arg) {
    let beautifiedArgs = "<br><h3>Sets found: </h3> "
    arg.forEach(set => {
        beautifiedArgs += "<br><h4>Set: </h4> "
        set.forEach(card => {
            beautifiedArgs += card.colour + ", " + card.number + ", " + card.shape + ", " + card.shading + "<br>"
        })
    })
    return beautifiedArgs
}

function addCard() {
    if (cards.length<12) {
        cards.push(
            new Card(
                searchColour.value(),
                searchNumber.value(),
                searchShape.value(),
                searchShading.value()
            )
        )
    }
}

function emptyCard() {
    cards = []
}

function removeDupes(cards) {
    return cards.filter((card, index, self) =>
        index === self.findIndex((otherCard) => card.isSameAs(otherCard))
    )
}

function findSets() {
    filteredCards = removeDupes(cards)
    const sets = getSets(filteredCards)
    displaySet(sets)
}

function windowResized() {
    const mainDiv = select(".main")
    resizeCanvas(mainDiv.width*0.65, window.innerHeight*0.8)
}

function draw() {
    background(0);

    let numColumns = 4;
    let numRows = 3;

    let marginRatio = 0.05
    let cardWidth = width / (numColumns + (numColumns - 1) * marginRatio)
    let cardHeight = height / (numRows + (numRows - 1) * marginRatio)
    let marginWidth = cardWidth * marginRatio
    let marginHeight = cardHeight * marginRatio

    for (let i = 0; i < cards.length; i++) {
        let x = marginWidth / 2 + (cardWidth + marginWidth) * (i % numColumns);
        let y = marginHeight / 2 + (cardHeight + marginHeight) * floor(i / numColumns);

        let cardImage = cardImages[`Cards/${cards[i].colour}_${cards[i].shape}_${cards[i].number}_${cards[i].shading}.png`];

        image(cardImage, x, y, cardWidth, cardHeight);
    }
}
