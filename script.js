 const curseWords = ['damn', 'hell', 'crap', 'shit', 'fuck', 'ass', 'bitch', 'motherfucker'];

        // Get DOM elements
        const textInput = document.getElementById('textInput');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const results = document.getElementById('results');
        const censoredText = document.getElementById('userText');
        const sentimentEmoji = document.getElementById('sentimentEmoji');
        const sentimentText = document.getElementById('sentimentText');
        const polarityValue = document.getElementById('polarityValue');
        const polarityIndicator = document.getElementById('polarityIndicator');
        const closest = document.getElementById('closeBtn');

        // Event listeners
        analyzeBtn.addEventListener('click', analyzeSentiment);
        
        textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                analyzeSentiment();
            }
        });

       closeButton.addEventListener('click', () => {
            results.classList.add('hidden')
            textInput.value = ""
        });

        textInput.addEventListener('input', () => {
            analyzeBtn.style.opacity = textInput.value.trim() ? '1' : '0.5';
        });

        // Censor text function
        function censorText(text) {
            const words = text.split(' ');
            return words.map(word => {
                const cleanWord = word.replace(/[.,!?;:"]/g, '').toLowerCase();
                if (curseWords.includes(cleanWord)) {
                    return word.length > 1 ? word[0] + '*'.repeat(word.length - 1) : '*';
                }
                return word;
            }).join(' ');
        }

        const sentiment = new Sentiment();

        function calculateSentiment(text) {
        const result = sentiment.analyze(text);

        let polarity = Math.max(-1, Math.min(1, result.comparative));

        let sentimentLabel;
        if (polarity > 0.1) {
            sentimentLabel = 'Positive';
        } else if (polarity < -0.1) {
            sentimentLabel = 'Negative';
        } else {
            sentimentLabel = 'Neutral';
        }

        return {
            polarity: polarity,
            sentiment: sentimentLabel
        };
    }


        // Main analysis function
        function analyzeSentiment() {
            const text = textInput.value.trim();
            
            if (text === '') {
                alert('⚠️ Please enter some text to analyze!');
                return;
            }

            // Perform analysis
            const censored = censorText(text);
            const result = calculateSentiment(text);

            // Display results
            displayResults(censored, result);
        }

        function displayResults(censored, result) {
            // Show results section
            results.classList.remove('hidden');
            
            // Display censored text
            censoredText.textContent = censored;
            
            // Display sentiment
            const emoji = getSentimentEmoji(result.sentiment);
            sentimentEmoji.textContent = emoji;
            sentimentText.textContent = result.sentiment;
            sentimentText.className = `sentiment-value ${result.sentiment.toLowerCase()}`;
            
            // Display polarity
            polarityValue.textContent = result.polarity.toFixed(2);
            
            // Update polarity indicator
            const percentage = ((result.polarity + 1) / 2) * 100;
            polarityIndicator.style.left = `${percentage}%`;
            
            // Smooth scroll
            results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function getSentimentEmoji(sentiment) {
            const emojis = {
                'Positive': '😊',
                'Negative': '😞',
                'Neutral': '😐'
            };
            return emojis[sentiment] || '😐';
        }

        // Initialize button state

        analyzeBtn.style.opacity = '0.7';

