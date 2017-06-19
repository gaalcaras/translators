# Translators

Custom translators for Zotero, developed during my PhD, targeting mainly mailing list archives.

If you don't know anything about Zotero translators, I recommend checking out my blog post ([in french](https://sociologs.com/fr/approche-pratique-archives-en-ligne/) or [in english](https://sociologs.com/en/practical-approach-online-archives/)) for a very gentle introduction.

## How to use / install


You can copy these files into the `translators` directory in your Zotero folder and start using them.

If you want to keep your own translators outside of the Zotero folder, you can create a symbolic link from the cloned repo to the translators directory :

```
ln -s path/to/the/repo/translator.js path/to/zotero/translators/translators.js
```

**Warning**: if you edit the translators with Scaffold, it might overwrite your symlink with the modified translator directly in Zotero's directory.
You'll have to symlink again − or you might create a script to do it for you ;-)
