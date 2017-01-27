{
	"translatorID": "6d85fd99-35ce-46d2-9f1d-6c6a0d40d455",
	"label": "MARC - Mailing list ARChive",
	"creator": "Gabriel Alcaras",
	"target": "https?://marc.info",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "g",
	"lastUpdated": "2017-01-26 15:27:07"
}

/* global Zotero, ZU */

// eslint-disable-next-line no-unused-vars
function detectWeb (doc, url) {
  var msgId = ZU.xpathText(doc, '//font/text()')
  Zotero.debug(msgId)

  if (msgId !== null && msgId.indexOf('Message-ID: ')) {
    return 'email'
  }
}

// eslint-disable-next-line no-unused-vars
function doWeb (doc, url) {
  var email = new Zotero.Item('email')

  /* Elements extraction */
  var listTxt = ZU.xpathText(doc, '//font/a[1]')
  var subTxt = ZU.xpathText(doc, '//font/a[2]')
  var fromTxt = ZU.xpathText(doc, '//font/a[3]')
  var dateTxt = ZU.xpathText(doc, '//font/a[4]')

  /* Name Extraction */
  var namePattern = new RegExp(/(.*)\s</)
  var authorName = namePattern.exec(fromTxt)[1]

  /* Date Extraction */
  var datePattern = new RegExp(/(\d{4}-\d{2}-\d{2})/)
  var sentDate = datePattern.exec(dateTxt)[1]

  email.title = subTxt
  email.shortTitle = listTxt + ' - Mailing list ARChives'

  email.creators.push(ZU.cleanAuthor(authorName))
  email.date = sentDate

  email.language = 'en'
  email.accessDate = 'CURRENT_TIMESTAMP'
  email.libraryCatalog = email.shortTitle
  email.url = url

  email.complete()
}

/** BEGIN TEST CASES **/
/** END TEST CASES **/
