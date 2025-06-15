document.addEventListener('DOMContentLoaded', () => {
    const articlesListSection = document.getElementById('articles-list');

    // 記事一覧ページの場合
    if (articlesListSection) {
        // URLのハッシュを確認
        const hash = window.location.hash;
        if (hash) {
            // ハッシュがあれば記事を表示
            const filename = hash.substring(1); // '#' を削除
            displayArticle(filename);
        } else {
            // ハッシュがなければ記事一覧を表示
            fetch('articles.json')
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
                        // リンクのhrefをハッシュ付きURLに変更
                        articleElement.innerHTML = `
                            <h3><a href="#${article.filename}" data-filename="${article.filename}">${article.title}</a></h3>
                        `;
                        articlesListSection.appendChild(articleElement);
                    });
                })
                .catch(error => {
                    console.error("Error loading articles list:", error);
                    articlesListSection.innerHTML = `<p>記事リストの読み込みに失敗しました。</p>`;
                });
        }


        // 記事リンクのクリックイベントリスナーを設定
        articlesListSection.addEventListener('click', (event) => {
            if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
                event.preventDefault();
                const filename = event.target.dataset.filename;
                displayArticle(filename);
            }
        });

        // URLハッシュ変更時のイベントリスナー (ブラウザの戻る/進むボタン対応)
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            if (hash) {
                const filename = hash.substring(1);
                displayArticle(filename);
            } else {
                // ハッシュがなくなったら記事一覧に戻る (ページをリロードまたは動的に一覧を再表示)
                window.location.reload(); // シンプルにページリロードで対応
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
