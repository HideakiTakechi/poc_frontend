document.addEventListener('DOMContentLoaded', () => {
    const articlesListSection = document.getElementById('articles-list');

    // 記事一覧ページの場合
    if (articlesListSection) {
        fetch('/articles.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(articleFiles => {
                articleFiles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.classList.add('article-item');
                    articleElement.innerHTML = `
                        <h3><a href="#" data-filename="${article.filename}">${article.title}</a></h3>
                    `;
                    articlesListSection.appendChild(articleElement);
                });
            })
            .catch(error => {
                console.error("Error loading articles list:", error);
                articlesListSection.innerHTML = `<p>記事リストの読み込みに失敗しました。</p>`;
            });


        // 記事リンクのクリックイベントリスナーを設定
        articlesListSection.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                event.preventDefault();
                const filename = event.target.dataset.filename;
                displayArticle(filename);
            }
        });
    }

    // 記事を表示する関数
    async function displayArticle(filename) {
        try {
            const response = await fetch(`articles/${filename}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            const html = marked.parse(markdown);

            articlesListSection.innerHTML = `
                <div class="article-content">
                    ${html}
                    <p><a href="articles.html">記事一覧に戻る</a></p>
                </div>
            `;
        } catch (error) {
            console.error("Error loading article:", error);
            articlesListSection.innerHTML = `<p>記事の読み込みに失敗しました。</p>`;
        }
    }
});
