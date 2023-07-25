// i initially made the code in C# so i just chatgpt the code into javascript

class Card {
    constructor(colour, number, shape, shading) {
        this.colour = colour;
        this.number = number;
        this.shape = shape;
        this.shading = shading;
    }
    isSameAs(other) {
        return this.colour==other.colour && this.number==other.number && this.shape==other.shape && this.shading==other.shading
    }
}

const convertors = {
    colour: { "Purple": 0, "Green": 1, "Red": 2 },
    number: { "1": 0, "2": 1, "3": 2 },
    shape: { "Oval": 0, "Squiggle": 1, "Diamond": 2 },
    shading: { "Outlined": 0, "Striped": 1, "Solid": 2 }
};

const convertorsInverse = {
    colour: ["Purple", "Green", "Red"],
    number: ["1", "2", "3"],
    shape: ["Oval", "Squiggle", "Diamond"],
    shading: ["Outlined", "Striped", "Solid"]
};

function toValues(cards) {
    return cards.map(card => [
        convertors.colour[card.colour],
        convertors.number[card.number],
        convertors.shape[card.shape],
        convertors.shading[card.shading]
    ]);
}

function toCard(values) {
    return new Card(
        convertorsInverse.colour[values[0]],
        convertorsInverse.number[values[1]],
        convertorsInverse.shape[values[2]],
        convertorsInverse.shading[values[3]]
    );
}

function getSets(cards) {
    let values = toValues(cards);
    let sets = [];

    for(let i = 0; i < values.length; i++) {
        for(let j = i+1; j < values.length; j++) {
            for(let k = j+1; k < values.length; k++) {
                if([0, 1, 2, 3].every(p => (values[i][p] + values[j][p] + values[k][p]) % 3 === 0)) {
                    sets.push([toCard(values[i]), toCard(values[j]), toCard(values[k])]);
                }
            }
        }
    }

    return sets;
}
