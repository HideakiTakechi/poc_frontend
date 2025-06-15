# [部活動名] Webサイト

このプロジェクトは、[部活動名] の活動を紹介するシンプルなWebサイトです。Markdown形式で記事を作成し、特定のディレクトリに配置することで、記事一覧ページに自動的に表示される仕組みを備えています。

## 機能

- ランディングページ: 部活動の紹介や最新情報へのリンクを表示します。
- 記事一覧ページ: 作成された記事のリストを表示します。
- Markdown記事表示: 記事一覧から選択したMarkdown形式の記事内容をWebサイト上で表示します。
- GitHub Actionsによる自動更新: `articles` ディレクトリにMarkdownファイルが追加・更新されると、記事リスト (`articles.json`) が自動的に更新されます。

## ローカル開発環境

ローカル環境で表示・開発するには、以下を実行します。

1.  リポジトリをクローンします。
2.  プロジェクトディレクトリに移動します。
3.  ローカルWebサーバーを使用してWebサイトを開きます。VS CodeのLive Server拡張機能などが便利です。

## 記事の追加方法

新しい記事を追加するには、以下の手順を実行します。

1.  `articles` ディレクトリ内に、Markdown形式（`.md` 拡張子）で新しい記事ファイルを作成します。
2.  記事ファイルを作成・編集したら、変更をコミットし、GitHubにプッシュします。
    ```bash
    git add articles/[新しい記事ファイル名].md
    git commit -m "Add new article: [記事タイトル]"
    git push origin main # または作業ブランチ
    ```
3.  GitHub Actionsが実行され、`articles.json` が更新されます。GitHub Pagesで公開している場合、しばらくするとWebサイトに新しい記事が表示されるようになります。

## GitHub Pagesでの公開

このWebサイトをGitHub Pagesで公開するには、GitHubリポジトリの設定で、公開元を `main` ブランチの `root` ディレクトリに設定してください。

## 使用技術

- HTML, CSS, JavaScript
- marked.js (MarkdownをHTMLに変換するために使用)
- GitHub Actions

---

© 2025 [部活動名]
