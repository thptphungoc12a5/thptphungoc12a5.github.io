        const header = document.querySelector('header');
        const main = document.querySelector('main');
        const backToTopButton = document.querySelector('.back');

        let headerHeight = 0;
        let lastScrollTop = 0;

        // --- Tự động điều chỉnh padding cho main ---
        function setMainPadding() {
            if (header && main) {
                headerHeight = header.offsetHeight;
                main.style.paddingTop = `${headerHeight}px`;
            }
        }

        setMainPadding(); // Đặt padding khi tải trang
        window.addEventListener('resize', setMainPadding); // Cập nhật padding khi thay đổi kích thước cửa sổ

        // Lắng nghe sự kiện cuộn trang
        window.addEventListener('scroll', function () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (header && scrollTop > lastScrollTop && scrollTop > headerHeight) {
                // Cuộn xuống và đã qua khỏi vị trí ban đầu của header
                header.style.top = `-${headerHeight}px`; // Ẩn header
            } else {
                // Cuộn lên
                if (header) header.style.top = '0'; // Hiện header
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Cập nhật vị trí cuộn cuối cùng

            // Logic hiện/ẩn nút back-to-top
            if (scrollTop > 300) { // Hiện nút khi cuộn xuống hơn 300px
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Lắng nghe sự kiện click vào nút back-to-top
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Cuộn mượt mà
            });
        });

        // --- Smooth Scroll Logic ---
        document.querySelectorAll('#main-nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });

        // --- Slideshow Logic ---
        let slideIndex = 1;
        let slideInterval;

        const page1 = document.querySelector('.page-1');
        const slideshowContainer = document.querySelector('.slideshow-container');
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.dots-container');

        // Tạo các dấu chấm
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('onclick', `currentSlide(${i + 1})`);
            dotsContainer.appendChild(dot);
        }
        const dots = document.querySelectorAll('.dot');

        function showSlides(n) {
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }

            // Di chuyển container
            slideshowContainer.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;

            // Cập nhật trạng thái active cho dấu chấm
            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex - 1].classList.add('active');
        }

        // Hàm cho nút next/prev
        function plusSlides(n) {
            showSlides(slideIndex += n);
            resetInterval();
        }

        // Hàm cho dấu chấm
        function currentSlide(n) {
            showSlides(slideIndex = n);
            resetInterval();
        }

        // Hàm reset tự động chạy
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => plusSlides(1), 3000);
        }

        // Khởi chạy slideshow
        document.addEventListener('DOMContentLoaded', () => {
            showSlides(slideIndex);
            resetInterval();

            resetInterval();

            // --- Album/Gallery Logic ---
            const albumsData = [
                {
                    name: "Album 1",
                    cover: "source/img/background01.jpg",
                    images: ["source/img/background01.jpg",
                        "source/img/background02.jpg",
                        "source/img/background03.jpg",
                        "source/img/album/snthaytam.jpg"
                    ]
                },
                {
                    name: "Album 2",
                    cover: "source/img/album/vannghe3.jpg",
                    images: ["source/img/album/vannghe3.jpg",
                        "source/img/album/vannghe1.jpg",
                        "source/img/album/vannghe2.jpg",
                        "source/img/album/vannghe.jpg"
                    ]
                },
                {
                    name: "Album 3",
                    cover: "source/img/album/chuclop.jpg",
                    images: ["source/img/album/chuclop.jpg",
                        "source/img/album/chucnhom3.jpg",
                        "source/img/album/chucnhom2.jpg",
                        "source/img/album/chucnhom.jpg",
                        "source/img/album/hoilop10.jpg",
                        "source/img/album/lehoianuong.jpg",
                        "source/img/album/hoianvat.jpg",
                        "source/img/album/dichoi.jpg"
                    ]
                },
                // Thêm các album khác vào đây
            ];
            initializeAlbums(albumsData);

            // --- Member List Logic ---
            // Dữ liệu danh sách lớp, bạn chỉ cần cập nhật ở đây
            const members = [
                { name: 'Huỳnh Thị Ngọc An', birthday: '09/12/2007', role: 'Thành viên' },
                { name: 'Trần Thị Quỳnh Anh', birthday: '26/05/2008', role: 'Thành viên' },
                { name: 'Nguyễn Hoàng Ân', birthday: '14/10/2008', role: 'Thành viên' },
                { name: 'Tằng Gia Bình', birthday: '14/06/2008', role: 'Tổ trưởng Tổ 2' },
                { name: 'Trần Khánh Quỳnh Châu', birthday: '07/08/2008', role: 'Thành viên' },
                { name: 'Nguyễn Hồng Dũng', birthday: '17/06/2008', role: 'Thành viên' },
                { name: 'Nguyễn Tấn Dũng', birthday: '06/12/2008', role: 'Thành viên' },
                { name: 'Nguyễn Tiến Đạt', birthday: '22/02/2008', role: 'Thành viên' },
                { name: 'Nguyễn Vũ Hải Đăng', birthday: '28/11/2008', role: 'Thành viên' },
                { name: 'Ngô Văn Hòa', birthday: '11/10/2008', role: 'Bí thư' },
                { name: 'Đặng Gia Huy', birthday: '03/08/2008', role: 'Thành viên' },
                { name: 'Phạm Trần Nhật Huy', birthday: '17/08/2008', role: 'Thành viên' },
                { name: 'Hoàng Thị Ngọc Lan', birthday: '22/07/2008', role: 'Thành viên' },
                { name: 'Trần Hoàng Long', birthday: '16/07/2007', role: 'Thành viên' },
                { name: 'Phạm Duy Lợi', birthday: '11/01/2008', role: 'Thành viên' },
                { name: 'Hoàng Lê Xuân Mai', birthday: '19/06/2008', role: 'Thành viên' },
                { name: 'Lê Thị Khánh Ngọc', birthday: '19/02/2008', role: 'Thành viên' },
                { name: 'Nguyễn Thị Thanh Nhàn', birthday: '14/07/2008', role: 'Thành viên' },
                { name: 'Nguyễn Trịnh Yến Nhi', birthday: '25/01/2008', role: 'Thành viên' },
                { name: 'Nguyễn Huỳnh Huệ Oanh', birthday: '25/11/2008', role: 'Lớp phó' },
                { name: 'Võ Thị Kiều Oanh', birthday: '21/01/2008', role: 'Thành viên' },
                { name: 'Trần Hồng Phúc', birthday: '26/07/2008', role: 'Thành viên' },
                { name: 'Nguyễn Trung Phước', birthday: '05/02/2008', role: 'Thành viên' },
                { name: 'Nguyễn Thị Cẩm Quyên', birthday: '24/05/2008', role: 'Tổ trưởng Tổ 3' },
                { name: 'Đặng Thị Thanh Thanh', birthday: '02/04/2008', role: 'Tổ trưởng Tổ 4' },
                { name: 'Nguyễn Vũ Trường Thiện', birthday: '03/04/2008', role: 'Thành viên' },
                { name: 'Nguyễn Thị Minh Thư', birthday: '29/01/2008', role: 'Thành viên' },
                { name: 'Trương Thị Thanh Thư', birthday: '09/07/2008', role: 'Thành viên' },
                { name: 'Nguyễn Thị Hoài Thương', birthday: '08/07/2008', role: 'Thành viên' },
                { name: 'Bùi Thái Thủy Tiên', birthday: '24/03/2008', role: 'Tổ trưởng Tổ 1' },
                { name: 'Phan Anh Tiến', birthday: '12/09/2008', role: 'Thành viên' },
                { name: 'Võ Ngọc Tiến', birthday: '18/09/2008', role: 'Thành viên' },
                { name: 'Vũ Hoàng Yến Trang', birthday: '23/03/2008', role: 'Thành viên' },
                { name: 'Trịnh Thị Bảo Trâm', birthday: '06/01/2008', role: 'Lớp trưởng' },
                { name: 'Tạ Minh Trường', birthday: '03/10/2008', role: 'Thành viên' },
                { name: 'Trương Mỹ Uyên', birthday: '20/10/2008', role: 'Thành viên' },
                { name: 'Huỳnh Khánh Vân', birthday: '30/04/2008', role: 'Thành viên' },
                { name: 'Trần Ngọc Tường Vy', birthday: '12/09/2008', role: 'Thành viên' },
                // Thêm các thành viên khác vào đây
                // { name: 'Tên thành viên', birthday: 'dd/mm/yyyy', role: 'Chức vụ' },
            ];

            checkBirthdays(members); // Kiểm tra sinh nhật

            const tableBody = document.getElementById('member-list-body');

            if (tableBody) {
                // Xóa nội dung cũ (nếu có)
                tableBody.innerHTML = '';
                // Tạo các hàng mới từ mảng dữ liệu
                members
                    .filter(member => member.name && member.birthday) // Lọc bỏ các thành viên rỗng
                    .forEach(member => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>${member.name}</td>
                        <td>${member.birthday}</td>
                        <td style="text-align: center;">${member.role}</td>
                    `;
                        tableBody.appendChild(row);
                    });
            }
        });

        // --- Birthday Check Logic ---
        function checkBirthdays(memberList) {
            const today = new Date();
            const currentDay = today.getDate();
            const currentMonth = today.getMonth() + 1; // getMonth() trả về từ 0-11

            const birthdayMembers = memberList.filter(member => {
                if (!member.birthday) return false;
                const [day, month] = member.birthday.split('/').map(Number);
                return day === currentDay && month === currentMonth;
            });

            if (birthdayMembers.length > 0) {
                const birthdayBox = document.querySelector('.sinhnhat');
                const nameSpan = birthdayBox.querySelector('p span');
                const closeButton = birthdayBox.querySelector('button');

                let names = birthdayMembers.map(m => m.name.split(' ').pop()); // Lấy tên cuối
                let nameString = '';

                if (names.length === 1) {
                    nameString = names[0];
                } else if (names.length === 2) {
                    nameString = names.join(' và ');
                } else {
                    nameString = names.slice(0, -1).join(', ') + ' và ' + names.slice(-1);
                }

                nameSpan.textContent = ' ' + nameString + ' ';
                birthdayBox.style.display = 'block';

                closeButton.addEventListener('click', () => {
                    birthdayBox.style.display = 'none';
                });
            }
        }



        // --- Album Functions ---
        let currentAlbumImages = [];
        let currentImageIndex = 0;
        const lightbox = document.getElementById('lightbox');
        const lightboxSlider = document.getElementById('lightbox-slider');

        function initializeAlbums(albums) {
            const albumGrid = document.getElementById('album-grid');
            if (!albumGrid) return;

            albumGrid.innerHTML = '';
            albums.forEach((album, index) => {
                const albumCard = document.createElement('div');
                albumCard.className = 'album-card';
                albumCard.innerHTML = `
                    <img src="${album.cover}" alt="${album.name}">
                    <div class="album-title">${album.name}</div>
                `;
                albumCard.onclick = () => openLightbox(albums[index].images, 0);
                albumGrid.appendChild(albumCard);
            });

            // Lightbox event listeners
            document.querySelector('.lightbox-close').onclick = closeLightbox;
            document.querySelector('.lightbox-prev').onclick = () => changeImage(-1);
            document.querySelector('.lightbox-next').onclick = () => changeImage(1);
        }

        function openLightbox(images, index) {
            currentAlbumImages = images;
            currentImageIndex = index;

            // Tạo các slide ảnh cho album
            lightboxSlider.innerHTML = '';
            images.forEach(imageSrc => {
                const slide = document.createElement('div');
                slide.className = 'lightbox-slide';
                slide.innerHTML = `<img src="${imageSrc}" alt="Album image">`;
                lightboxSlider.appendChild(slide);
            });

            // Hiển thị ảnh đúng vị trí ban đầu (không có hiệu ứng trượt)
            lightboxSlider.style.transition = 'none';
            lightboxSlider.style.transform = `translateX(-${currentImageIndex * 100}%)`;

            lightbox.style.display = 'block';
            populateThumbnails(images, index);
            document.addEventListener('keydown', handleKeydown);
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            lightboxSlider.innerHTML = ''; // Xóa các slide khi đóng
            document.removeEventListener('keydown', handleKeydown);
        }

        function changeImage(step) {
            currentImageIndex += step;
            if (currentImageIndex >= currentAlbumImages.length) {
                currentImageIndex = 0;
            }
            if (currentImageIndex < 0) {
                currentImageIndex = currentAlbumImages.length - 1;
            }

            // Trượt slider đến ảnh mới
            lightboxSlider.style.transition = 'transform 0.5s ease-in-out';
            lightboxSlider.style.transform = `translateX(-${currentImageIndex * 100}%)`;
            updateThumbnailHighlight();
        }

        function populateThumbnails(images, activeIndex) {
            const thumbnailsContainer = document.getElementById('lightbox-thumbnails');
            thumbnailsContainer.innerHTML = '';
            images.forEach((imageSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imageSrc;
                thumb.className = 'thumbnail-img';
                if (index === activeIndex) {
                    thumb.classList.add('active');
                }
                thumb.onclick = () => {
                    changeImage(index - currentImageIndex); // Tính toán bước nhảy và chuyển ảnh
                };
                thumbnailsContainer.appendChild(thumb);
            });
        }

        function updateThumbnailHighlight() {
            document.querySelectorAll('.thumbnail-img').forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentImageIndex);
            });
        }

        function handleKeydown(e) {
            if (e.key === 'ArrowRight') {
                changeImage(1);
            } else if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }

        /* Sakana Modal */
        // Kiểm tra xem có phải thiết bị di động không
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        // Chỉ hiển thị trên PC với tỷ lệ 50%, không hiển thị trên mobile
        if (!isMobile && Math.random() < 0.5) {
            // Tắt âm thanh của nhân vật.
            Sakana.setMute(false);

            // Khởi tạo nhân vật thứ nhất (Takina)
            Sakana.init({
                el: ".sakana-box-l",      // Đặt nhân vật vào thẻ có class "sakana-box-l"
                scale: .5,               // Tỷ lệ kích thước: 50% so với gốc
                character: "takina",     // Chọn nhân vật là "takina"
                canSwitchCharacter: false, // Không cho phép người dùng đổi nhân vật
                inertia: .005,           // Quán tính: độ lắc lư sau khi kéo thả
                decay: 1                 // Độ suy giảm: tốc độ dừng lại của chuyển động
            });
            // Khởi tạo nhân vật thứ hai (Chisato)
            Sakana.init({
                el: ".sakana-box-r",      // Đặt nhân vật vào thẻ có class "sakana-box-r"
                scale: .5,               // Tỷ lệ kích thước: 50%
                character: "chisato",    // Chọn nhân vật là "chisato"
                canSwitchCharacter: false, // Không cho phép người dùng đổi nhân vật
                inertia: .005,           // Quán tính
                decay: 1                 // Độ suy giảm
            });
        }