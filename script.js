// --- 1. GO TO CHAPTER (Index Page) ---
function openBook(bookElement, chapter) {
    bookElement.classList.add("pulled");
    setTimeout(() => {
        document.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = `book.html?chapter=${chapter}`;
        }, 500);
    }, 400);
}

// --- 2. BACK TO SHELF ---
function goBack() {
    document.body.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 400);
}

// --- 3. THE CONTENT LOADER ---
let selectedEmoji = null;
let selectedText = null;

function loadChapterContent() {
    const params = new URLSearchParams(window.location.search);
    const chapterId = params.get("chapter");
    const titleElement = document.getElementById("chapterTitle");
    const textElement = document.getElementById("storyText");
    const gameContainer = document.getElementById("game-container");

    if (!titleElement || !textElement) return;

    const chapters = {
        "1": { title: "Happy Anniversary", text: "It was 14th Feb 2016, when we officially became 'us', but it was exactly the college gathering night when you took my heart 🫶🏼 Distance means I can't give you flowers in person, but I wanted to make something virtual for you. Click the vase to build your own bouquet!", hasGame: "flower" },
        "2": { title: "Little things", text: "This bookshelf is too small to capture all the things I feel about you. The way you have always protected me by making me walk on inner side of the road, to the way you surprised me with that one gift I regretted leaving behind on vacation... you never miss a detail. You are my safest place to be.", hasGame: "hearts" },
        "3": { title: "My Boldest Move", text: "Remember us sitting on the bench away from the world and me giving you a cheek kiss, your expressions were to die for! I can still see that shocked face - you never thought I would do something like that, did you? But I did, life is all about uncovering surprises like these ;)", hasGame:"kiss" },
        "4": { title: "One Earphone, Two Hearts", text: "My most treasured memory is that college trip together. Sitting by the window with the wind in our face, sharing one pair of earphones to listen to songs... it was perfect. And that time in the pool, just talking for hours about absolutely nothing, but felt so good! . We only have this one photo as proof, but I don't need pictures to remember how good it felt to be with you.", hasGame: "camera" },
        "5": { title: "Why It's You", text: "You often wonder what do I see in you, little do you know - I see everything in you. The compassion you carry, your adventourous spirit, your romantic overloading, your notorious mischielf, your ambitions towards life, your kind heart and just everyhting. Look over to the side to see what all qualities I love in you!", hasGame: "jar" },
        "6": { title: "The Usual Getaway", text: "Bunking lectures just to visit this place with you will always be one of my favorite memories. I still remember us sitting on that rock near the khadi for hours every morning. The little crabs, the greenery, and the quiet atmosphere - everything was just perfect. I'd choose those mornings with you over a lecture any day. I wonder if our 'spot' on that rock is still there?", hasGame: "puzzle" },
        "7": { title: "Our Little Language", text: "Love doesn't always need words right? Sometimes it needs some stickers and emojis! When the day is quiet and there's not much going on... these are the things that keep it going between us, don't you agree? Some emojis are strictly yours and some are jussstttt mine, and we definitely don't steal them off eachother 😉", hasGame: "emoji" },
        "8": { title: "Rolls & Swirls", text: "Walking in the hot sun was always worth it for that rolled ice cream. Those summer walks always ended the same way - one cup, our favorite rolled chocolate ice cream and a lot of oreo and chocochip toppings! I really miss the feeling of us just sharing that cup together. It was the best way to cool down a day.", hasGame: "icecream" },
        "9": { title: "Words That Take My Heart", text: "Poems are your way of expressing love, and the way you capture feelings in words is something I could never do. Whenever I receive a poem from you, I'm honestly on the moon. Thank you for teaching me that life isn't just about breathing - it's about feeling every moment. This one is for you. ", hasGame: "scratch" },
        "10": { title: "Cutest Shenanigans", text: "One morning I woke up and you told me to look out of my bedroom window for a surprise - and surprised I was! - to see you had arranged the useless sticks in words that meant the world to me. It was such a mischievous and unique way to wish me a happy anniversary.", hasGame: "sticks" }
    };

    const chapter = chapters[chapterId];
    titleElement.innerHTML = chapter?.title || "Chapter " + chapterId;
    textElement.innerHTML = chapter?.text || "Still writing...";

    // If it's Chapter number, start the game
    if (!chapter) return;

    document.getElementById("chapterTitle").innerText = chapter.title;
    document.getElementById("storyText").innerText = chapter.text;

    if (chapter.hasGame === "emoji") {
        startEmojiGame();
    } else if (chapter.hasGame === "hearts") {
        startHeartGame();
    } else if (chapter.hasGame === "jar") {
        startJarGame();
    } else if (chapter.hasGame === "puzzle") { 
        startPuzzleGame(); 
    } else if (chapter.hasGame === "sticks") { 
        startStickGame(); 
    } else if (chapter.hasGame === "kiss") {
        startKissGame();
    } else if (chapter.hasGame === "icecream") {
        startIceCreamGame();
    } else if (chapter.hasGame === "flower") {
        startBouquetGame();
    } else if (chapter.hasGame === "camera") {
        startCameraGame();
    } else if (chapter.hasGame === "scratch") {
        startScratchGame();
    }
}

function startEmojiGame() {
    const container = document.getElementById("game-container");
    
    // We'll use a catchy title that fits the vibe
    const gameTitle = "Match them up! Respectively! ✨";

    container.innerHTML = `
        <div class="emoji-game">
            <p class="game-instruction">${gameTitle}</p>
            <div class="game-columns">
                <div id="left-column" class="column"></div>
                <div id="right-column" class="column"></div>
            </div>
            <p id="game-status"></p>
        </div>
    `;

    const data = [
        { left: "👻", right: "👽", id: 1 },
        { left: "🌝", right: "🌚", id: 2 },
        { left: "💜", right: "🖤", id: 3 },
        { left: "😙", right: "😗", id: 4 }
    ];

    // Create Left Column (Normal Order)
    data.forEach(item => {
        const btn = document.createElement("div");
        btn.className = "match-item";
        btn.innerText = item.left;
        btn.onclick = () => selectItem(btn, 'left', item.id);
        document.getElementById("left-column").appendChild(btn);
    });

    // Create Right Column (Shuffled so it's a challenge!)
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    shuffled.forEach(item => {
        const btn = document.createElement("div");
        btn.className = "match-item";
        btn.innerText = item.right;
        btn.onclick = () => selectItem(btn, 'right', item.id);
        document.getElementById("right-column").appendChild(btn);
    });
}

// Logic to handle matching
let leftSelect = null;
let rightSelect = null;

function selectItem(el, side, matchId) {
    if (el.classList.contains('matched')) return;

    // Visual selection feedback
    const column = el.parentElement.querySelectorAll('.match-item');
    column.forEach(s => s.classList.remove('selected'));
    el.classList.add('selected');

    if (side === 'left') leftSelect = { el, id: matchId };
    if (side === 'right') rightSelect = { el, id: matchId };

    if (leftSelect && rightSelect) {
        if (leftSelect.id === rightSelect.id) {
            // MATCH!
            leftSelect.el.classList.add('matched');
            rightSelect.el.classList.add('matched');
            leftSelect = null;
            rightSelect = null;
            checkWin();
        } else {
            // WRONG - reset after a brief moment
            const l = leftSelect.el;
            const r = rightSelect.el;
            setTimeout(() => {
                l.classList.remove('selected');
                r.classList.remove('selected');
            }, 400);
            leftSelect = null;
            rightSelect = null;
        }
    }
}

function checkWin() {
    const matchedCount = document.querySelectorAll('.matched').length;
    if (matchedCount === 8) { // 4 pairs = 8 pieces
        document.getElementById("game-status").innerText = "Perfectly Matched! Just like us. ❤️";
    }
}


let score = 0;
let heartInterval;

function startHeartGame() {
    score = 0;
    const container = document.getElementById("game-container");
    container.innerHTML = `<div class="score-board">Hearts Caught: <span id="score">0</span>/10</div>`;

    // Create a new heart every 800ms
    heartInterval = setInterval(() => {
        createHeart(container);
    }, 800);
}

function createHeart(container) {
    if (score >= 10) return;

    const heart = document.createElement("div");
    heart.className = "floating-heart";
    const icons = ["❤️", "💛", "💜", "💚","🖤","🧡","💙"];
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];    
    heart.style.left = Math.random() * 70 + 10 + "%"; // Keep away from edges
    
    // Change onclick to onmousedown for faster response
    heart.onmousedown = (e) => {
        e.stopPropagation(); // Prevents clicking the page underneath
        score++;
        const scoreElement = document.getElementById("score");
        if(scoreElement) scoreElement.innerText = score;
        
        heart.style.display = 'none'; // Hide immediately
        heart.remove(); 
        
        if (score === 10) {
            clearInterval(heartInterval);
            showWinMessage();
        }
    };

    container.appendChild(heart);

    // Clean up if not caught
    setTimeout(() => { 
        if(heart.parentNode === container) {
            heart.remove(); 
        }
    }, 4000);
}

function showWinMessage() {
    const container = document.getElementById("game-container");
    container.innerHTML = `
        <div style="text-align:center; padding-top:100px; animation: fadeIn 1s;">
            <h2 style="color:#a44a3f; font-size: 2rem;">Caught! ❤️</h2>
            <p style="font-style: italic;">My heart is all yours, in this lifetime and all others.</p>
        </div>`;
}


let droppedCount = 0;

function startJarGame() {
    droppedCount = 0;
    const container = document.getElementById("game-container");
    container.innerHTML = `
        <div class="jar-wrapper">
            <div id="word-bank" style="height: 200px; width: 100%; position: relative;"></div>
            <div class="jar" id="main-jar"></div>
            <p id="jar-status" style="margin-top: 10px; font-weight: bold; color: #5a3e2b;"></p>
        </div>
    `;

    const traits = [
        "Kind-hearted", "Compassionate", "Lovable", "Sane-minded", 
        "Ambitious", "Hilarious", "Adventurous", "Understanding", "Romantic", "Notorious",
        "Thoughtful", "Genuine", "Cute", "Protective"
    ];

    const bank = document.getElementById("word-bank");

    traits.forEach((trait, index) => {
        const word = document.createElement("div");
        word.className = "trait-word";
        word.innerText = trait;
        
        // Randomly scatter words at the top
        word.style.top = Math.random() * 100 + "px";
        word.style.left = Math.random() * 60 + 5 + "%";

        word.onclick = () => {
            dropWord(word, traits.length);
        };

        bank.appendChild(word);
    });
}

function dropWord(el, total) {
    const jar = document.getElementById("main-jar");
    
    // 1. Mark as dropped
    el.classList.add("in-jar");
    
    // 2. Move the element physically into the jar 
    // This makes the jar the new "parent"
    jar.appendChild(el);

    // 3. Set position relative to the JAR bottom
    // We stack them by using the droppedCount
    const stackLevel = Math.floor(droppedCount / 2) * 25; // Stacks every 2 words
    const sideShift = (droppedCount % 2 === 0) ? "10px" : "auto";
    const rightShift = (droppedCount % 2 !== 0) ? "10px" : "auto";

    el.style.top = "auto"; // Reset top
    el.style.bottom = (stackLevel + 10) + "px"; // Sit at the bottom
    el.style.left = sideShift;
    el.style.right = rightShift;
    
    // Give it a random tilt so they look "dropped in"
    el.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;

    droppedCount++;

    if (droppedCount === total) {
        finishJar(jar);
    }
}

function finishJar(jar) {
    setTimeout(() => {
        document.getElementById("jar-status").innerText = "A jar full of reasons why I love you! ❤️";
        jar.style.boxShadow = "0 0 25px #ffd700";
        jar.style.backgroundColor = "rgba(255, 215, 0, 0.15)";
        
        // Add a little heart emoji "pop" at the top of the jar
        const heart = document.createElement("div");
        heart.style.position = "absolute";
        heart.style.top = "-20px";
        heart.style.fontSize = "2rem";
        jar.appendChild(heart);
    }, 600);
}


function startPuzzleGame() {
    const container = document.getElementById("game-container");
    container.innerHTML = `
        <div class="emoji-game">
            <p class="game-instruction">Tap two pieces to swap them! ✨</p>
            <div id="puzzle-grid" class="puzzle-board"></div>
            <p id="game-status"></p>
        </div>
    `;

    const imgUrl = "images/puzzle.png"; // Your local path
    let positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let shuffled = [...positions].sort(() => Math.random() - 0.5);

    const grid = document.getElementById("puzzle-grid");

    shuffled.forEach((pos, index) => {
        const piece = document.createElement("div");
        piece.className = "puzzle-piece";
        piece.dataset.currentIdx = index; 
        piece.dataset.correctPos = pos;

        // 3x3 grid calculation
        const x = (pos % 3) * 80;
        const y = Math.floor(pos / 3) * 80;
        piece.style.backgroundImage = `url(${imgUrl})`;
        piece.style.backgroundPosition = `-${x}px -${y}px`;

        piece.onclick = () => swapPieces(piece);
        grid.appendChild(piece);
    });
}

let selectedPiece = null;

function swapPieces(clickedPiece) {
    if (!selectedPiece) {
        selectedPiece = clickedPiece;
        clickedPiece.classList.add("selected");
    } else {
        // Swap Background
        const tempBG = selectedPiece.style.backgroundPosition;
        const tempPos = selectedPiece.dataset.correctPos;

        selectedPiece.style.backgroundPosition = clickedPiece.style.backgroundPosition;
        selectedPiece.dataset.correctPos = clickedPiece.dataset.correctPos;

        clickedPiece.style.backgroundPosition = tempBG;
        clickedPiece.dataset.correctPos = tempPos;

        // Clean up
        selectedPiece.classList.remove("selected");
        selectedPiece = null;

        checkPuzzleWin();
    }
}

function checkPuzzleWin() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    let win = true;
    pieces.forEach((p, index) => {
        if (parseInt(p.dataset.correctPos) !== index) win = false;
    });

    if (win) {
        document.getElementById("game-status").innerText = "Everything is in its right place! ❤️";
        document.getElementById("puzzle-grid").style.gap = "0";
        document.getElementById("puzzle-grid").style.padding = "0";
    }
}


// This is the most reliable way to trigger the text load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadChapterContent);
} else {
    loadChapterContent();
}



function startStickGame() {
    const container = document.getElementById("game-container");
    container.innerHTML = `
        <div class="stick-game-wrapper">
            <h3 class="memory-title">Wanna relive the Memory ?</h3>
            
            <div id="stick-area" class="stick-container">
                <div id="ghost-text" class="message-overlay">HAPPY ANNIVERSARY</div>
            </div>

            <button class="assemble-btn" onclick="assembleSticks()">
                Assemble the Sticks
            </button>
        </div>
    `;

    const area = document.getElementById("stick-area");
    
    // We'll create 50 sticks for a fuller effect
    for (let i = 0; i < 50; i++) {
        const stick = document.createElement("div");
        stick.className = "stick";
        
        // Randomly scatter around the container
        const startX = Math.random() * 90; 
        const startY = Math.random() * 90; 
        const startRot = Math.random() * 360;
        
        stick.style.left = startX + "%";
        stick.style.top = startY + "%";
        stick.style.transform = `rotate(${startRot}deg)`;
        
        area.appendChild(stick);
    }
}

function assembleSticks() {
    const sticks = document.querySelectorAll(".stick");
    const ghostText = document.getElementById("ghost-text");
    const btn = document.querySelector(".assemble-btn");

    // This keeps the button's 'space' so the box above it doesn't drop down
    btn.style.visibility = "hidden"; 

    sticks.forEach((stick, index) => {
        stick.style.left = "50%";
        stick.style.top = "50%";
        stick.style.transform = `rotate(${1080 + index * 20}deg) scale(0)`;
        stick.style.opacity = "0";
    });

    setTimeout(() => {
        ghostText.style.opacity = "1";
    }, 1200);
}


function startKissGame() {
    const container = document.getElementById("game-container");
    container.innerHTML = `
    <div class="kiss-game-wrapper">
        <p class="game-instruction">Surprise yourself again! ❤️</p>
        <div class="interaction-area">
            <img src="images/girl.png" class="character girl" id="girl-img">
            <img src="images/boy1.png" class="character boy" id="boy-img">
            <div id="kiss-effect" class="kiss-heart">Muahhh 😉💋</div>
        </div>
    </div>
    `;
    setupKissLogic();
}

function setupKissLogic() {
    const girl = document.getElementById('girl-img');
    const boy = document.getElementById('boy-img');
    const effect = document.getElementById('kiss-effect');
    let isDragging = false;

    girl.ondragstart = () => false;

    girl.onmousedown = (e) => { 
        isDragging = true;
        e.preventDefault(); 
    };

    document.onmouseup = () => isDragging = false;

    document.onmousemove = (e) => {
        if (!isDragging) return;

        const area = document.querySelector('.interaction-area').getBoundingClientRect();
        let x = e.clientX - area.left - (girl.offsetWidth / 2);

        // Standard boundary check
        if (x < 0) x = 0;
        if (x > area.width - girl.offsetWidth) x = area.width - girl.offsetWidth;

        girl.style.left = x + 'px';

        const boyRect = boy.getBoundingClientRect();
        const girlRect = girl.getBoundingClientRect();
        
        // This is the "overlap" distance
        // If this number is positive, they haven't touched.
        // If it's negative, she is overlapping him.
        const overlapDistance = girlRect.right - boyRect.left;

        // 1. Face change logic
        if (overlapDistance > 20 && overlapDistance < 60) {
            boy.src = "images/boy2.png"; // Shocked as she approaches/overlaps
        } else if (overlapDistance <= -20) {
            // Keep him shocked during the kiss!
            boy.src = "images/boy2.png";
        } else {
            boy.src = "images/boy1.png"; // Normal when far away
        }

        // 2. The Overlap Snap (Trigger when she covers ~20px of him)
        if (overlapDistance >= 20) {
            const overlapPixels = boy.offsetWidth * 0.50; // Your perfect overlap
            const finalX = (boyRect.left - area.left) - girl.offsetWidth + overlapPixels;
            
            girl.style.left = finalX + 'px';
            
            // Force the face to stay shocked
            boy.src = "images/boy2.png"; 

            // Show the emoji
            effect.classList.add('show');
            
            // Add a little log here just to be sure it's firing!
            console.log("Kiss triggered!"); 

            isDragging = false; 
        }
    };
}


function startIceCreamGame() {
    const container = document.getElementById("game-container");
    container.innerHTML = `
        <div class="ice-cream-wrapper">
            <p id="ice-cream-hint" class="game-instruction">Tap the plate to make 7 rolls! ✨</p>
            
            <div id="plate" class="ice-cream-plate" onclick="createRoll(event)">
                </div>
            
            <img id="final-ice-cream-img" src="images/rolls-swirls.png" class="final-popup-img">
        </div>
    `;
    rollCount = 0;
}

function createRoll(event) {
    if (rollCount >= 7) return; // Increased to 7 rolls per your request

    const wrapper = document.querySelector(".ice-cream-wrapper");
    const plate = document.getElementById("plate");
    const hint = document.getElementById("ice-cream-hint");
    
    rollCount++;

    const rollWrapper = document.createElement("div");
    rollWrapper.className = "roll-wrapper";
    
    const wrapperRect = wrapper.getBoundingClientRect();
    rollWrapper.style.left = (event.clientX - wrapperRect.left - 20) + "px";
    rollWrapper.style.top = (event.clientY - wrapperRect.top - 40) + "px";

    const roll = document.createElement("div");
    roll.className = "ice-roll-animate";
    
    rollWrapper.appendChild(roll);
    wrapper.appendChild(rollWrapper);

    setTimeout(() => { roll.style.height = "70px"; }, 10);

    // Inside your createRoll function where the 7th roll is detected:
    if (rollCount === 7) {
        const hint = document.getElementById("ice-cream-hint");
        hint.innerText = "Making it special...";

        setTimeout(() => {
            const finalImg = document.getElementById("final-ice-cream-img");
            const plate = document.getElementById("plate");
            const allWrappers = document.querySelectorAll(".roll-wrapper");
        
            // Hide rolls and plate
            allWrappers.forEach(rw => {
                rw.style.opacity = "0";
                rw.style.transform = "scale(0)";
            });
            plate.style.opacity = "0";
            plate.style.pointerEvents = "none"; // Stop further clicks

            // Show Image and Text together
            setTimeout(() => {
                finalImg.classList.add("show");
            
                // This is the fix: ensure text is updated and visible
                hint.innerHTML = "Rolls & Swirls - just the way we liked it! ❤️";
                hint.style.opacity = "1";
                hint.style.color = "#ff4d6d";
                hint.style.fontWeight = "bold";
            }, 600);
        }, 1200);
    }
}



// Add as many as you like! Adjust x and y for each.
const flowerData = [
    { img: 'rose.png', x: -30, y: 74, rot: 5, scale: 1.2 },    // Front left
    { img: 'sunflower.png', x: -50, y:70, rot: -2, scale: 1.2 },    // Center tall
    { img: 'lily.png', x: -115, y: 115, rot: -15, scale: 0.7 },      // Back right
    { img: 'lavender.png', x: -40, y: 108, rot: 20, scale: 0.9 }, // Back left
    { img: 'daisy.png', x: -45, y: 115, rot: -5, scale: 0.7 },    // Side filler
    { img: 'peony.png', x: -8, y: 115, rot: 15, scale: 0.6 },        // Front center
    { img: 'tulip.png', x: -47, y: 120, rot: -5, scale: 0.4 },      // Front right
];

let flowerIndex = 0;

function startBouquetGame() {
    const gameContainer = document.getElementById("game-container");
    
    gameContainer.innerHTML = `
        <div id="bouquet-wrapper" style="
            position: relative; 
            width: 100%; 
            height: 100%; 
            display: flex; 
            flex-direction: column; 
            justify-content: flex-end; 
            align-items: center;
            padding-bottom: 20px;
        ">
            <div id="bouquet-message" style="
                position: absolute;
                top: 15px; /* Adjust this to move it higher or lower from the top */
                left: 50%;
                transform: translateX(-50%);
                opacity: 0; 
                transition: opacity 1s ease; 
                font-family: 'Georgia', serif; 
                font-size: 1.5rem; 
                color: #d63384; 
                font-style: italic;
                font-weight: bold;
                text-align: center;
                width: 100%;
                pointer-events: none; /* Keeps the click working for the flowers */
            ">
                A perfect bouquet, just for you. ❤️
            </div>

            <div id="bouquet-area" onclick="addFlowerToVase()" style="
                position: relative; 
                width: 400px; 
                height: 500px; 
                display: flex; 
                justify-content: center; 
                align-items: flex-end; 
                cursor: pointer;
            ">
                <img src="images/bouquet/vase.png" id="vase-img" style="width: 300px; z-index: 5; position: relative; pointer-events: none;">
            </div>
        </div>
    `;
}

function addFlowerToVase() {
    if (flowerIndex >= flowerData.length) {
        // Show the message above the bouquet instead of updating left text
        const message = document.getElementById("bouquet-message");
        message.style.opacity = "1";
        return;
    }

    const area = document.getElementById("bouquet-area");
    const data = flowerData[flowerIndex]; 
    
    const flower = document.createElement("img");
    flower.src = `images/bouquet/${data.img}`;
    flower.className = "flower-png";

    flower.style.cssText = `
        position: absolute;
        bottom: ${120 + data.y}px; 
        left: calc(50% + ${data.x}px - 40px);
        height: 180px;
        z-index: 10;
        transform-origin: bottom center;
        transform: rotate(${data.rot}deg) scale(0);
        transition: transform 1s ease-out;
        pointer-events: none;
    `;

    area.appendChild(flower);

    setTimeout(() => {
        flower.style.transform = `rotate(${data.rot}deg) scale(${data.scale})`;
    }, 10);

    flowerIndex++;

    // Optional: Auto-show message if you want it to appear exactly when the last flower grows
    if (flowerIndex === flowerData.length) {
        setTimeout(() => {
            document.getElementById("bouquet-message").style.opacity = "1";
        }, 500);
    }
}


function startCameraGame() {
    const gameContainer = document.getElementById("game-container");
    
    gameContainer.innerHTML = `
        <div id="camera-scene" style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            
            <p id="camera-hint" style="margin-bottom: 20px; font-family: sans-serif; color: #555;">Click the camera to see a memory...</p>
            
            <div id="photo-area" onclick="takePhoto()" style="cursor: pointer; position: relative; width: 300px; height: 350px; display: flex; justify-content: center; align-items: center;">
                
                <img src="images/camera.png" id="camera-icon" style="width: 150px; z-index: 5;">
                
                <img src="images/trip_polaroid.png" id="trip-photo" style="
                    position: absolute; 
                    width: 280px; 
                    border-radius: 15px; /* Adjust this for more/less rounding */
                    display: none; /* Hidden at first */
                    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
                    z-index: 10;
                ">
            </div>
            
            <div id="flash" style="position: absolute; inset: 0; background: white; opacity: 0; pointer-events: none; z-index: 100;"></div>
        </div>
    `;
}

function takePhoto() {
    const camera = document.getElementById("camera-icon");
    const photo = document.getElementById("trip-photo");
    const flash = document.getElementById("flash");
    const hint = document.getElementById("camera-hint");

    // 1. Quick Flash
    flash.style.opacity = "1";
    
    setTimeout(() => {
        flash.style.opacity = "0";
        flash.style.transition = "opacity 0.5s ease";
        
        // 2. Switch camera for photo
        camera.style.display = "none";
        photo.style.display = "block";
        
        // 3. Update Text
        hint.innerText = "Cutest click ❤️";
    }, 100);
}


function startScratchGame() {
    const gameContainer = document.getElementById("game-container");
    
    gameContainer.innerHTML = `
        <div style="display: flex; width: 100%; height: 100%; align-items: center; justify-content: space-around; padding: 20px; gap: 20px;">

            <div id="scratch-container" style="position: relative; width: 320px; height: 200px; user-select: none;">
                <div id="secret-poem" style="position: absolute; inset: 0; background: #fff5f5; border: 2px solid #ffccd5; border-radius: 10px; display: flex; align-items: center; justify-content: center; text-align: center; padding: 15px; font-family: 'Arial', sans-serif; color: #d63384; font-weight: bold; line-height: 1.8;">
                    कधी कोमेजलेल्या फुलासारखी होते मी,<br>
                    तू येऊन मला पुन्हा फुलवले...<br>
                    साधे जगणे तर सगळेच जगतात,<br>
                    पण आयुष्य अनुभवणे तू शिकवले.
                </div>
                
                <canvas id="scratch-canvas" width="320" height="200" style="position: absolute; inset: 0; cursor: crosshair; border-radius: 10px; z-index: 5;"></canvas>
            </div>
        </div>
    `;

    initScratchCard();
}

function initScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    // Fill canvas with silver color
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some "scratch here" text
    ctx.fillStyle = '#666';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal...', canvas.width/2, canvas.height/2);

    function scratch(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('touchstart', () => isDrawing = true);
    window.addEventListener('mouseup', () => isDrawing = false);
    window.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); });
}


function openFinalLetter() {
    document.getElementById("letter-overlay").style.display = "flex";
    initHeartLock();
}

function closeOverlay() {
    document.getElementById("letter-overlay").style.display = "none";
    // Reset for next time
    document.getElementById("lock-screen").style.display = "block";
    document.getElementById("letter-screen").style.display = "none";
}

function initHeartLock() {
    const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;

    const dots = [
        { x: 150, y: 80, hit: false },  // Top center
        { x: 80, y: 50, hit: false },   // Left hump
        { x: 40, y: 120, hit: false },  // Left side
        { x: 150, y: 250, hit: false }, // Bottom point
        { x: 260, y: 120, hit: false }, // Right side
        { x: 220, y: 50, hit: false }   // Right hump
    ];

    let drawing = false;
    let userPath = []; // Stores the points the user draws

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw the user's line
        if (userPath.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = "#ff4d6d"; // Romantic pink line
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.moveTo(userPath[0].x, userPath[0].y);
            for (let i = 1; i < userPath.length; i++) {
                ctx.lineTo(userPath[i].x, userPath[i].y);
            }
            ctx.stroke();
        }

        // 2. Draw the dots
        dots.forEach(dot => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = dot.hit ? "#ff4d6d" : "#ccc";
            ctx.fill();
        });
    }

    canvas.onmousedown = (e) => { 
        drawing = true; 
        userPath = []; // Reset line on new click
        dots.forEach(d => d.hit = false); // Reset dots
    };

    canvas.onmousemove = (e) => {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        userPath.push({x, y});

        dots.forEach(dot => {
            const dist = Math.sqrt((x - dot.x)**2 + (y - dot.y)**2);
            if (dist < 20) dot.hit = true;
        });
        draw();
    };

    canvas.onmouseup = () => { 
        drawing = false; 
        const allHit = dots.every(d => d.hit);
        
        if (allHit) {
            document.getElementById("lock-screen").style.display = "none";
            document.getElementById("letter-screen").style.display = "flex";
        } else {
            // Briefly show the failed attempt then clear
            setTimeout(() => {
                userPath = [];
                dots.forEach(d => d.hit = false);
                draw();
            }, 300);
        }
    };
    
    draw(); // Initial draw of dots
}