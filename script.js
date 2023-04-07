const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const result = document.getElementById("result")
const sound = document.getElementById("sound")
const btn = document.getElementById("search-btn")
const wordMeaning = document.getElementById("word-meaning")
const divCarouselInd = document.getElementById("carouselExampleIndicators")

let clicks = 0;
btn.addEventListener('click', async () => {

    let inpWord = document.getElementById("inp-word").value
    await fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            if(document.querySelector('.word') !== null) {
                document.querySelector('.word').remove()
            }

            // Name of word and sound button display
            let wordDiv = document.createElement("div")
            wordDiv.setAttribute("class", "word")
            wordDiv.innerHTML = `
            <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fa-sharp fa-solid fa-volume-high"></i>
                </button>
            
            `;

            if(document.querySelector('.details') !== null) {
                document.querySelector('.details').remove()
            }
            // To display the details like noun/verb and pronounciation
            let detailsDiv = document.createElement("div")
            detailsDiv.setAttribute("class", "details")
            detailsDiv.innerHTML = `
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
            `;
            result.prepend(wordDiv, detailsDiv)


            //     <div class="carousel-inner">
            //     <div class="carousel-item ">
            //         <span>"${data[0].meanings[0].definitions[0].definition}"
            //         </span>
            //     </div>
            //     <div class="carousel-item active">
            //         <span>"${data[0].meanings[0].definitions[1].definition}"
            //         </span>
            //     </div>
            //     <div class="carousel-item ">
            //         <span>"${data[0].meanings[0].definitions[2].definition}"
            //         </span>
            //     </div>
            // </div>


            if(document.querySelector('.carousel-inner') !== null) {
                document.querySelector('.carousel-inner').remove()
            }


            //to display the carousel to display multiple definitions of the word
            let divCarousel = document.createElement("div")
            divCarousel.setAttribute("class", "carousel-inner")
            divCarouselInd.appendChild(divCarousel)



            // const totalDef = data[0].meanings[0].definitions.length
            // // console.log(totalDef);

            // for (let def of data[0].meanings[0].definitions) {
            //     console.log(def.definition);
            // }

            let i = 0;

            for (let def of data[0].meanings[0].definitions) {

                let divCarItem = document.createElement("div") // holds the span that has the definition
                if (i == 0)
                    divCarItem.setAttribute("class", "carousel-item active ")
                else
                    divCarItem.setAttribute("class", "carousel-item")

                let spanItem = document.createElement("span") //holds the definition
                spanItem.innerText = `"${def.definition}"`;

                divCarItem.appendChild(spanItem)

                divCarousel.appendChild(divCarItem)
                i++

            }

            // <div class="carousel-btn">
            //     <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            //         data-bs-slide="prev">
            //         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            //         <span class="visually-hidden">Previous</span>
            //     </button>
            //     <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            //         data-bs-slide="next">
            //         <span class="carousel-control-next-icon" aria-hidden="true"></span>
            //         <span class="visually-hidden">Next</span>
            //     </button>
            // </div>


            if(document.querySelector('.carousel-btn') !== null) {
                document.querySelector('.carousel-btn').remove()
            }



            let divCarouselBtn = document.createElement("div")
            divCarouselBtn.setAttribute("class", "carousel-btn")
            divCarouselBtn.innerHTML = `
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        `;

            result.appendChild(divCarouselBtn)


            //     <div class="word-synonym">

            //     Synonym:
            //     <span class="syn">Author</span>
            //     <span class="syn">Author</span>
            //     <span class="syn">Author</span>

            // </div>

            if(document.querySelector('.word-synonym') !== null) {
                document.querySelector('.word-synonym').remove()
            }

            let divSynonym = document.createElement("div")
            divSynonym.setAttribute("class", "word-synonym")
            divSynonym.innerHTML = `
                <div style="width:100%"> Synonym:</div>
            `;

            for (let syn of data[0].meanings[0].synonyms) {
                let spanSyn = document.createElement("span")
                spanSyn.setAttribute("class", "syn")
                spanSyn.innerText = `${syn}`
                divSynonym.appendChild(spanSyn)

            }

            result.appendChild(divSynonym)









            sound.setAttribute("src", `${data[0].phonetics[0].audio || data[0].phonetics[1].audio}`)

        })
        .catch(err = () => {
            result.innerHTML = `
                <h3 class="error">
                    NOT FOUND!
                </h3>
                `
        })

})

function playSound() {
    sound.play()
}
