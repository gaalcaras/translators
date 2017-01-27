{
	"translatorID": "9fe35d4c-4140-4807-8050-1b7bc12f47d0",
	"label": "LKML",
	"creator": "Gabriel Alcaras",
	"target": "http://lkml.iu.edu/hypermail/linux/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "g",
	"lastUpdated": "2017-01-25 16:16:14"
}

/* global Zotero, ZU */

// eslint-disable-next-line no-unused-vars
function detectWeb (doc, url) {
  return 'email'
}

// eslint-disable-next-line no-unused-vars
function doWeb (doc, url) {
  var date = {'year': 0, 'month': 0, 'day': 0}
  var month = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'}
  var email = new Zotero.Item('email')
  var comments = ZU.xpathText(doc, 'comment()')
  var namePattern = new RegExp(/name="([^"]*)"/)
  var subjectPattern = new RegExp(/subject="([^"]*)"/)
  var sentPattern = new RegExp(/sent="([^"]*)"/)
  var datePattern = new RegExp(/(\d{1,2})\s(\w{3})\s(\d{2,4})/)

  var title = subjectPattern.exec(comments)[1]
  var pubTitle = ''

  if (url.indexOf('alpha') > -1) {
    pubTitle = 'Linux-Alpha'
  } else {
    pubTitle = 'LKML'
  }

  email.title = title
  email.shortTitle = pubTitle

  email.creators.push(ZU.cleanAuthor(namePattern.exec(comments)[1],
    'author', false))

  var sent = sentPattern.exec(comments)[1]
  var dateMatch = datePattern.exec(sent)
  date.year = dateMatch[3]

  if (date.year < 99) {
    date.year = '19' + date.year
  }

  date.month = month[dateMatch[2]]
  date.day = dateMatch[1]

  var fDate = Object.keys(date).map(function (x) { return date[x] }).join('-')
  email.date = fDate

  email.language = 'en'
  email.url = url
  email.accessDate = 'CURRENT_TIMESTAMP'

  email.libraryCatalog = pubTitle

  email.complete()
}

/** BEGIN TEST CASES **/

/** Test Cases Documentation :
 * 1/ Linux Alpha typical example
 * 2/ Year is formatted with only two digits
 * 3/ LKML typical example
 */

eslint-disable-next-line no-unused-vars
var testCases = [
	{
		"type": "web",
		"url": "http://lkml.iu.edu/hypermail/linux/alpha/9511/0174.html",
		"items": [
			{
				"itemType": "email",
				"subject": "Re: Have I jumped the gun...",
				"creators": [
					{
						"firstName": "Linus",
						"lastName": "Torvalds",
						"creatorType": "author"
					}
				],
				"date": "1995-11-28",
				"language": "en",
				"shortTitle": "Linux-Alpha",
				"url": "http://lkml.iu.edu/hypermail/linux/alpha/9511/0174.html",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://lkml.iu.edu/hypermail/linux/alpha/9512/0015.html",
		"items": [
			{
				"itemType": "email",
				"subject": "Re: Linux 1.3.45 change log",
				"creators": [
					{
						"firstName": "Brian",
						"lastName": "Dowling",
						"creatorType": "author"
					}
				],
				"date": "1995-12-01",
				"language": "en",
				"shortTitle": "Linux-Alpha",
				"url": "http://lkml.iu.edu/hypermail/linux/alpha/9512/0015.html",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://lkml.iu.edu/hypermail/linux/kernel/9506/0000.html",
		"items": [
			{
				"itemType": "email",
				"subject": "New Mailing Archives",
				"creators": [
					{
						"firstName": "Chris",
						"lastName": "Dent",
						"creatorType": "author"
					}
				],
				"date": "1995-06-23",
				"language": "en",
				"shortTitle": "LKML",
				"url": "http://lkml.iu.edu/hypermail/linux/kernel/9506/0000.html",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
