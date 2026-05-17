        // ============================================
        // PRELOADER
        // ============================================
        window.addEventListener('load', function () {
            const preloaderElement = document.getElementById('preloader');
            if (preloaderElement) {
                setTimeout(function () {
                    preloaderElement.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                    if (typeof initConfetti === 'function') initConfetti();
                }, 1800);
            }
        });

        // Prevent scroll during loading
        document.body.style.overflow = 'hidden';

        // ============================================
        // HEADER SCROLL EFFECT
        // ============================================
        const headerElement = document.getElementById('header');
        let lastScrollPos = 0;

        if (headerElement) {
            window.addEventListener('scroll', function () {
                const currentScroll = window.pageYOffset;
                if (currentScroll > 50) {
                    headerElement.classList.add('scrolled');
                } else {
                    headerElement.classList.remove('scrolled');
                }
                lastScrollPos = currentScroll;
            });
        }

        // ============================================
        // MOBILE MENU TOGGLE
        // ============================================
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileNav = document.getElementById('mobileNav');

        if (mobileToggle && mobileNav) {
            mobileToggle.addEventListener('click', function () {
                mobileToggle.classList.toggle('active');
                mobileNav.classList.toggle('open');
            });

            // Close mobile nav on link click
            const mobileLinks = mobileNav.querySelectorAll('a');
            mobileLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    mobileToggle.classList.remove('active');
                    mobileNav.classList.remove('open');
                });
            });
        }

        // ============================================
        // COUNTDOWN TIMER
        // ============================================
        const ceremonyDate = new Date('2026-07-17T18:30:00-04:00').getTime();

        const countDaysEl = document.getElementById('countDays');
        const countHoursEl = document.getElementById('countHours');
        const countMinutesEl = document.getElementById('countMinutes');
        const countSecondsEl = document.getElementById('countSeconds');

        if (countDaysEl && countHoursEl && countMinutesEl && countSecondsEl) {
            function updateCountdown() {
                const currentTime = Date.now();
                const timeDifference = ceremonyDate - currentTime;

                if (timeDifference <= 0) {
                    countDaysEl.textContent = '000';
                    countHoursEl.textContent = '00';
                    countMinutesEl.textContent = '00';
                    countSecondsEl.textContent = '00';
                    return;
                }

                const totalSeconds = Math.floor(timeDifference / 1000);
                const daysVal = Math.floor(totalSeconds / 86400);
                const hoursVal = Math.floor((totalSeconds % 86400) / 3600);
                const minutesVal = Math.floor((totalSeconds % 3600) / 60);
                const secondsVal = totalSeconds % 60;

                countDaysEl.textContent = String(daysVal).padStart(3, '0');
                countHoursEl.textContent = String(hoursVal).padStart(2, '0');
                countMinutesEl.textContent = String(minutesVal).padStart(2, '0');
                countSecondsEl.textContent = String(secondsVal).padStart(2, '0');
            }

            updateCountdown();
            setInterval(updateCountdown, 1000);
        }

        // ============================================
        // SCROLL ANIMATIONS (Intersection Observer)
        // ============================================
        const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const scrollObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(function (el) {
            scrollObserver.observe(el);
        });

        // ============================================
        // MESSAGE TEXTAREA CHARACTER COUNTER
        // ============================================
        const messageTextarea = document.getElementById('messageTextarea');
        const charCountEl = document.getElementById('charCount');

        if (messageTextarea && charCountEl) {
            messageTextarea.addEventListener('input', function () {
                const currentLength = messageTextarea.value.length;
                charCountEl.textContent = currentLength;
                if (currentLength >= 180) {
                    charCountEl.style.color = '#ef4444';
                } else {
                    charCountEl.style.color = '';
                }
            });
        }

        // ============================================
        // SEND MESSAGE BUTTON
        // ============================================
        const btnSendMessage = document.getElementById('btnSendMessage');

        if (btnSendMessage && messageTextarea && charCountEl) {
            btnSendMessage.addEventListener('click', function () {
                const messageText = messageTextarea.value.trim();
                if (messageText.length === 0) {
                    messageTextarea.style.borderColor = '#ef4444';
                    messageTextarea.setAttribute('placeholder', 'Por favor escribe un mensaje...');
                    setTimeout(function () {
                        messageTextarea.style.borderColor = '';
                        messageTextarea.setAttribute('placeholder', 'Escribe tu mensaje de felicitación...');
                    }, 2000);
                    return;
                }

                // Create new message element
                const messagesList = document.querySelector('.messages-list');
                const viewMore = document.querySelector('.messages-view-more');

                if (messagesList && viewMore) {
                    const initials = messageText.substring(0, 2).toUpperCase();
                    const colors = [
                        'linear-gradient(135deg, #065577, #009bb6)',
                        'linear-gradient(135deg, #f09433, #e6683c)',
                        'linear-gradient(135deg, #F2B632, #ffc328)',
                        'linear-gradient(135deg, #2AAFE6, #145A96)'
                    ];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];

                    const newMessage = document.createElement('div');
                    newMessage.className = 'message-item';
                    newMessage.style.opacity = '0';
                    newMessage.style.transform = 'translateY(10px)';
                    newMessage.innerHTML = `
                        <div class="message-avatar" style="background: ${randomColor};">Tú</div>
                        <div class="message-content">
                            <div class="message-header">
                                <span class="message-name">Invitado</span>
                                <span class="message-time">Ahora mismo</span>
                            </div>
                            <p class="message-text">${messageText}</p>
                            <div class="message-likes" data-liked="false" data-count="0">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                </svg>
                                <span class="likes-count">0</span>
                            </div>
                        </div>
                    `;

                    messagesList.insertBefore(newMessage, viewMore);

                    // Animate in
                    requestAnimationFrame(function () {
                        newMessage.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        newMessage.style.opacity = '1';
                        newMessage.style.transform = 'translateY(0)';
                    });

                    // Clear textarea
                    messageTextarea.value = '';
                    charCountEl.textContent = '0';

                    // Attach like event to new message
                    const newLike = newMessage.querySelector('.message-likes');
                    if (newLike) setupLikeButton(newLike);
                }
            });
        }

        // ============================================
        // LIKE BUTTON FUNCTIONALITY
        // ============================================
        function setupLikeButton(likeElement) {
            likeElement.addEventListener('click', function () {
                const isLiked = this.getAttribute('data-liked') === 'true';
                const countSpan = this.querySelector('.likes-count');
                let currentCount = parseInt(this.getAttribute('data-count'));

                if (isLiked) {
                    currentCount--;
                    this.setAttribute('data-liked', 'false');
                    this.style.color = '';
                } else {
                    currentCount++;
                    this.setAttribute('data-liked', 'true');
                    this.style.color = '#ef4444';
                }

                this.setAttribute('data-count', currentCount);
                countSpan.textContent = currentCount;
            });
        }

        // Setup existing like buttons
        document.querySelectorAll('.message-likes').forEach(function (likeEl) {
            setupLikeButton(likeEl);
        });

        // ============================================
        // CONFETTI ANIMATION
        // ============================================
        function initConfetti() {
            const canvas = document.getElementById('confettiCanvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            const confettiPieces = [];
            const confettiColors = ['#ffc328', '#F2B632', '#065577', '#009bb6', '#2AAFE6', '#0A3D6D', '#145A96', '#ffffff'];

            // Create initial confetti
            for (let i = 0; i < 60; i++) {
                confettiPieces.push(createConfettiPiece(true));
            }

            function createConfettiPiece(fromTop) {
                return {
                    x: Math.random() * canvas.width,
                    y: fromTop ? Math.random() * -100 : Math.random() * canvas.height,
                    w: Math.random() * 10 + 5,
                    h: Math.random() * 6 + 3,
                    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                    speed: Math.random() * 1.5 + 0.5,
                    angle: Math.random() * Math.PI * 2,
                    spinSpeed: (Math.random() - 0.5) * 0.05,
                    drift: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.6 + 0.3
                };
            }

            let animationFrameId = null;
            let confettiActive = true;
            let confettiDuration = 4000; // 4 seconds of active confetti
            let confettiStartTime = Date.now();

            function animateConfetti() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const elapsed = Date.now() - confettiStartTime;
                if (elapsed > confettiDuration) {
                    confettiActive = false;
                }

                confettiPieces.forEach(function (piece) {
                    piece.y += piece.speed;
                    piece.x += piece.drift;
                    piece.angle += piece.spinSpeed;

                    // Fade out near end
                    if (elapsed > confettiDuration - 1000) {
                        piece.opacity = Math.max(0, piece.opacity - 0.01);
                    }

                    ctx.save();
                    ctx.translate(piece.x, piece.y);
                    ctx.rotate(piece.angle);
                    ctx.globalAlpha = piece.opacity;
                    ctx.fillStyle = piece.color;
                    ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
                    ctx.restore();

                    // Reset if off screen and still active
                    if (piece.y > canvas.height + 20 && confettiActive) {
                        piece.y = -20;
                        piece.x = Math.random() * canvas.width;
                        piece.opacity = Math.random() * 0.6 + 0.3;
                    }
                });

                // Remove finished pieces
                if (!confettiActive) {
                    const remaining = confettiPieces.filter(function (p) { return p.opacity > 0; });
                    if (remaining.length === 0) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        return;
                    }
                }

                animationFrameId = requestAnimationFrame(animateConfetti);
            }

            animateConfetti();
        }

        // ============================================
        // CALENDAR BUTTON
        // ============================================
        const btnCalendar = document.querySelector('.btn-calendar');
        if (btnCalendar) {
            btnCalendar.addEventListener('click', function () {
                const eventDetails = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BYU Pathway Venezuela//Graduation//EN\nBEGIN:VEVENT\nDTSTART:20260717T183000-0400\nDTEND:20260717T210000-0400\nSUMMARY:Ceremonia de Graduación BYU Pathway Venezuela\nDESCRIPTION:Celebración de graduación conjunta Instituto de Religión y BYU-Pathway Worldwide\nLOCATION:Capilla Campo Alegre, Caracas, Venezuela\nEND:VEVENT\nEND:VCALENDAR';
                const blob = new Blob([eventDetails], { type: 'text/calendar;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'graduacion-byu-pathway-2026.ics';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
        }

        // ============================================
        // AGENDA ANIMATIONS AND FUNCTIONS
        // ============================================
        window.downloadCalendarAgenda = function() {
            const eventDetails = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BYU Pathway Venezuela//Graduation//EN\nBEGIN:VEVENT\nDTSTART:20261215T100000-0400\nDTEND:20261215T153000-0400\nSUMMARY:Ceremonia de Graduación BYU Pathway Venezuela\nDESCRIPTION:Celebración de graduación conjunta Instituto de Religión y BYU-Pathway Worldwide\nLOCATION:Centro de Convenciones de Caracas, Venezuela\nEND:VEVENT\nEND:VCALENDAR';
            const blob = new Blob([eventDetails], { type: 'text/calendar;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'graduacion-byu-pathway-2026.ics';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        };

        const btnHeroCalendar = document.getElementById('btnHeroCalendar');
        if (btnHeroCalendar) {
            btnHeroCalendar.addEventListener('click', window.downloadCalendarAgenda);
        }

        function handleTimelineAnimations() {
            const cards = document.querySelectorAll('.timeline-card');
            if(cards.length === 0) return;
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            cards.forEach(function(card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(card);
            });
        }

        function handleSidebarAnimations() {
            const sidebarCards = document.querySelectorAll('.sidebar-card');
            if(sidebarCards.length === 0) return;
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            sidebarCards.forEach(function(card, index) {
                card.style.opacity = '0';
                card.style.transform = 'translateX(30px)';
                card.style.transition = 'opacity 0.5s ease ' + (index * 0.15) + 's, transform 0.5s ease ' + (index * 0.15) + 's';
                observer.observe(card);
            });
        }

        function handleTipsAnimations() {
            if (!document.querySelector('.tips-card')) return;
            const tips = document.querySelectorAll('.tip-item');
            if(tips.length === 0) return;
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const tipItems = entry.target.querySelectorAll('.tip-item');
                        tipItems.forEach(function(item, i) {
                            setTimeout(function() {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, i * 100);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            tips.forEach(function(item) {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });

            const tipsCard = document.querySelector('.tips-card');
            if (tipsCard) observer.observe(tipsCard);
        }

        // Initialize Agenda Animations directly
        handleTimelineAnimations();
        handleSidebarAnimations();
        handleTipsAnimations();

        // ============================================
        // SMOOTH SCROLL FOR ANCHOR LINKS
        // ============================================
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') {
                    e.preventDefault();
                    return;
                }
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
