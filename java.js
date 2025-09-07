'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selections ---
    const header = document.querySelector('header');
    const navMenu = document.getElementById('nav-menu');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const overlay = document.getElementById('overlay');
    const scrollBtn = document.getElementById('scroll-top');
    const navLinks = document.querySelectorAll('#nav-menu a');
    
    // Contact Modal Elements
    const contactModal = document.getElementById('contact-modal');
    const contactOpenBtns = [document.getElementById('contact-btn-header'), document.getElementById('contact-btn-main')];
    const contactCloseBtn = document.getElementById('contact-close-btn');
    const copyEmailBtn = document.getElementById('copy-email-btn');

    // Quote Modal Elements
    const quoteModal = document.getElementById('quote-modal');
    const quoteOpenBtn = document.getElementById('quote-btn');
    const quoteCloseBtn = document.getElementById('quote-close-btn');
    const quoteTextEl = document.getElementById('quote-text');
    const quoteAuthorEl = document.getElementById('quote-author');

    // --- Mobile Navigation (Hamburger Menu) ---
    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        // Change icon to 'X' when menu is open
        const icon = hamburgerBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    const closeMobileMenu = () => {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        const icon = hamburgerBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    };

    // Close menu when a link is clicked or overlay is touched
    navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    overlay.addEventListener('click', () => {
        closeMobileMenu();
        closeModal(contactModal);
        closeModal(quoteModal);
    });

    // --- Contact Modal Logic ---
    const openModal = (modal) => {
        modal.classList.add('active');
        overlay.classList.add('active');
    };

    const closeModal = (modal) => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    };

    contactOpenBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(contactModal);
        });
    });

    if (contactCloseBtn) contactCloseBtn.addEventListener('click', () => closeModal(contactModal));
    
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('sumitbrsumit@gmail.com').then(() => {
                copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied to Clipboard!';
                setTimeout(() => {
                    copyEmailBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Email Address';
                }, 2000);
            });
        });
    }

    // --- Quote Generator Logic ---
    const quotes = [
        { quote: "The important thing is not to stop questioning. Curiosity has its own reason for existing.", author: "Albert Einstein" },
        { quote: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
        { quote: "The good life is one inspired by love and guided by knowledge.", author: "Bertrand Russell" },
        { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
        { quote: "Science is not only a disciple of reason but also one of romance and passion.", author: "Stephen Hawking" },
        { quote: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
        { quote: "The only source of knowledge is experience.", author: "Albert Einstein" },
        { quote: "What we know is a drop, what we don't know is an ocean.", author: "Isaac Newton" },
        { quote: "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.", author: "Stephen Hawking" },
        { quote: "I have no special talent. I am only passionately curious.", author: "Albert Einstein" },
        { quote: "The beginning of knowledge is the discovery of something we do not understand.", author: "Frank Herbert" },
        { quote: "To know that we know what we know, and to know that we do not know what we do not know, that is true knowledge.", author: "Nicolaus Copernicus" },
        { quote: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { quote: "The measure of intelligence is the ability to change.", author: "Albert Einstein" },
        { quote: "All that is necessary for the triumph of evil is that good men do nothing.", author: "Edmund Burke" },
        { quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
        { quote: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.", author: "Charles Darwin" },
        { quote: "Do not be embarrassed by your failures, learn from them and start again.", author: "Richard Branson" },
        { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
        { quote: "The unexamined life is not worth living.", author: "Socrates" },
        { quote: "There is only one good, knowledge, and one evil, ignorance.", author: "Socrates" },
        { quote: "Be kind, for everyone you meet is fighting a hard battle.", author: "Plato" },
        { quote: "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.", author: "Plato" },
        { quote: "The heaviest penalty for declining to rule is to be ruled by someone inferior to yourself.", author: "Plato" },
        { quote: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
        { quote: "It is the mark of an educated mind to be able to entertain a thought without accepting it.", author: "Aristotle" },
        { quote: "Patience is bitter, but its fruit is sweet.", author: "Aristotle" },
        { quote: "A friend to all is a friend to none.", author: "Aristotle" },
        { quote: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
        { quote: "Do not pray for an easy life, pray for the strength to endure a difficult one.", author: "Bruce Lee" },
        { quote: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee" },
        { quote: "An eye for an eye will only make the whole world blind.", author: "Mahatma Gandhi" },
        { quote: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
        { quote: "The weak can never forgive. Forgiveness is the attribute of the strong.", author: "Mahatma Gandhi" },
        { quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
        { quote: "The mind is everything. What you think you become.", author: "Buddha" },
        { quote: "Three things cannot be long hidden: the sun, the moon, and the truth.", author: "Buddha" },
        { quote: "You will not be punished for your anger, you will be punished by your anger.", author: "Buddha" },
        { quote: "Peace comes from within. Do not seek it without.", author: "Buddha" },
        { quote: "However many holy words you read, however many you speak, what good will they do you if you do not act on upon them?", author: "Buddha" },
        { quote: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
        { quote: "The tongue like a sharp knife... Kills without drawing blood.", author: "Buddha" },
        { quote: "Believe nothing, no matter where you read it, or who said it, no matter if I have said it, unless it agrees with your own reason and your own common sense.", author: "Buddha" },
        { quote: "It is better to travel well than to arrive.", author: "Buddha" },
        { quote: "A jug fills drop by drop.", author: "Buddha" },
        { quote: "The root of suffering is attachment.", author: "Buddha" },
        { quote: "There is no path to happiness: happiness is the path.", author: "Buddha" },
        { quote: "Your purpose in life is to find your purpose and give your whole heart and soul to it.", author: "Buddha" },
        { quote: "If you light a lamp for someone else, it will also brighten your path.", author: "Buddha" },
        { quote: "The greatest prayer is patience.", author: "Buddha" },
        { quote: "What you are is what you have been. What you'll be is what you do now.", author: "Buddha" },
        { quote: "Those who are free of resentful thoughts surely find peace.", author: "Buddha" },
        { quote: "Speak or act with an impure mind and trouble will follow you.", author: "Buddha" },
        { quote: "It is a man's own mind, not his enemy or foe, that lures him to evil ways.", author: "Buddha" },
        { quote: "All that we are is the result of what we have thought.", author: "Buddha" },
        { quote: "The only real failure in life is not to be true to the best one knows.", author: "Buddha" },
        { quote: "Purity or impurity depends on oneself, no one can purify another.", author: "Buddha" },
        { quote: "You, yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
        { quote: "There are only two mistakes one can make along the road to truth; not going all the way, and not starting.", author: "Buddha" },
        { quote: "If your compassion does not include yourself, it is incomplete.", author: "Buddha" },
        { quote: "Wear your ego like a loose-fitting garment.", author: "Buddha" },
        { quote: "When you dig a well, there's no sign of water until you reach it, only rocks and dirt to move out of the way. You have removed enough dirt and rocks and now you will soon get to the water.", author: "Buddha" },
        { quote: "To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear.", author: "Buddha" },
        { quote: "Even death is not to be feared by one who has lived wisely.", author: "Buddha" },
        { quote: "Hatred does not cease by hatred, but only by love; this is the eternal rule.", author: "Buddha" },
        { quote: "The secret of health for both mind and body is not to mourn for the past, nor to worry about the future, but to live the present moment wisely and earnestly.", author: "Buddha" },
        { quote: "To conquer oneself is a greater task than conquering others.", author: "Buddha" },
        { quote: "Better than a thousand hollow words, is one word that brings peace.", author: "Buddha" },
        { quote: "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.", author: "Buddha" },
        { quote: "Do not believe in anything simply because you have heard it... But after observation and analysis, when you find that anything agrees with reason and is conducive to the good and benefit of one and all, then accept it and live up to it.", author: "Buddha" },
        { quote: "The greatest wealth is to live content with little.", author: "Plato" },
        { quote: "The more I live, the more I learn. The more I learn, the more I realize, the less I know.", author: "Michel Legrand" },
        { quote: "If you can't explain it simply, you don't understand it well enough.", author: "Albert Einstein" },
        { quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
        { quote: "We cannot solve our problems with the same thinking we used when we created them.", author: "Albert Einstein" },
        { quote: "Try not to become a man of success. Rather become a man of value.", author: "Albert Einstein" },
        { quote: "The true sign of intelligence is not knowledge but imagination.", author: "Albert Einstein" },
        { quote: "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.", author: "Albert Einstein" },
        { quote: "God does not play dice with the universe.", author: "Albert Einstein" },
        { quote: "Logic will get you from A to Z; imagination will get you everywhere.", author: "Albert Einstein" },
        { quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
        { quote: "If a cluttered desk is a sign of a cluttered mind, of what, then, is an empty desk a sign?", author: "Albert Einstein" },
        { quote: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
        { quote: "I speak to everyone in the same way, whether he is the garbage man or the president of the university.", author: "Albert Einstein" },
        { quote: "The most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and true science.", author: "Albert Einstein" },
        { quote: "He who can no longer pause to wonder and stand rapt in awe, is as good as dead; his eyes are closed.", author: "Albert Einstein" },
        { quote: "Intellectuals solve problems, geniuses prevent them.", author: "Albert Einstein" },
        { quote: "Education is what remains after one has forgotten what one has learned in school.", author: "Albert Einstein" },
        { quote: "The value of a man should be seen in what he gives and not in what he is able to receive.", author: "Albert Einstein" },
        { quote: "It's not that I'm so smart, it's just that I stay with problems longer.", author: "Albert Einstein" },
        { quote: "The difference between genius and stupidity is that genius has its limits.", author: "Albert Einstein" },
        { quote: "Weak people revenge. Strong people forgive. Intelligent people ignore.", author: "Albert Einstein" },
        { quote: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.", author: "Albert Einstein" },
        { quote: "Once we accept our limits, we go beyond them.", author: "Albert Einstein" },
        { quote: "Kindness is a language which the deaf can hear and the blind can see.", author: "Mark Twain" },
        { quote: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain" }
    ];

    if (quoteOpenBtn) {
        quoteOpenBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteTextEl.textContent = `“${quotes[randomIndex].quote}”`;
            quoteAuthorEl.textContent = `— ${quotes[randomIndex].author}`;
            openModal(quoteModal);
        });
    }
    if (quoteCloseBtn) quoteCloseBtn.addEventListener('click', () => closeModal(quoteModal));
    
    // --- Scroll to Top Button ---
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.style.display = window.scrollY > 200 ? 'flex' : 'none';
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});