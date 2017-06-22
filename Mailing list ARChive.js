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

  if (msgId !== null && msgId.indexOf('Message-ID: ')) {
    return 'email'
  }
}

// eslint-disable-next-line no-unused-vars
function doWeb (doc, url) {
  var email = new Zotero.Item('email')

  var metadata = ZU.xpathText(doc, '//font').split('\n')

  /* Elements extraction */
  var listTxt = metadata[1]
  var subTxt = metadata[2]
  var fromTxt = metadata[3]
  var dateTxt = metadata[4]

  /* Name Extraction */
  var namePattern = new RegExp(/:\s+"?([^"]*)"?\s</)
  var authorName = namePattern.exec(fromTxt)[1]

  /* Date Extraction */
  var datePattern = new RegExp(/:\s+(\d{4}-\d{2}-\d{2})/)
  var sentDate = datePattern.exec(dateTxt)[1]

  /* Title Extraction */
  var titlePattern = new RegExp(/:\s+(.*)/)
  var title = titlePattern.exec(subTxt)[1]
  email.title = title

  /* List Extraction */
  var listPattern = new RegExp(/:\s+(.*)/)
  var list = listPattern.exec(listTxt)[1]
  /* Capitalize list name */
  list = list.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })

  email.shortTitle = list + ' - Mailing list ARChives'

  email.creators.push(ZU.cleanAuthor(authorName, 'author'))
  email.date = sentDate

  email.language = 'en'
  email.accessDate = 'CURRENT_TIMESTAMP'
  email.libraryCatalog = email.shortTitle
  email.url = url

  email.complete()
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "http://marc.info/?l=linux-kernel&m=87602757922179&w=2",
		"items": [
			{
				"itemType": "email",
				"subject": "Mutt && the list",
				"creators": [
					{
						"firstName": "Aaron",
						"lastName": "Tiensivu",
						"creatorType": "author"
					}
				],
				"date": "1997-08-29",
				"language": "en",
				"shortTitle": "Linux-kernel - Mailing list ARChives",
				"url": "http://marc.info/?l=linux-kernel&m=87602757922179&w=2",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://marc.info/?l=git&m=116233880601299&w=2",
		"items": [
			{
				"itemType": "email",
				"subject": "Re: [PATCH] make git-push a bit more verbose",
				"creators": [
					{
						"firstName": "Junio C.",
						"lastName": "Hamano",
						"creatorType": "author"
					}
				],
				"date": "2006-10-31",
				"language": "en",
				"shortTitle": "Git - Mailing list ARChives",
				"url": "http://marc.info/?l=git&m=116233880601299&w=2",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
