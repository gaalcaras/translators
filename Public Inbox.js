{
	"translatorID": "aa9b974f-d74c-4602-8813-77d950b903bb",
	"label": "Public Inbox",
	"creator": "Gabriel Alcaras",
	"target": "https://public-inbox.org/git/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2018-06-11 21:41:32"
}

function detectWeb (doc, url) {
  return 'email'
}

function doWeb (doc, url) {
  url = url.replace('/#t', '/')
  
  ZU.HTTP.doGet(url + 'raw', function(response) {
	var email = new Zotero.Item('email')

	var from = get_header(response, 'From')

	/* Name Extraction */
	var namePattern = new RegExp(/(.*)</)
	var authorName = namePattern.exec(from)[1]

	email.date = get_header(response, 'Date')

	email.title = get_header(response, 'Subject')
	email.url = url

	email.creators.push(ZU.cleanAuthor(authorName, 'author'))

	email.shortTitle = 'PublicInbox'

	//email.author = from
	email.complete()
  })
}

function get_header(doc, header) {
  var pattern = "" + header + "\:(.*)"
  var reg = new RegExp(pattern, "g")
  var from = reg.exec(doc)[1]

  return from
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://public-inbox.org/git/CA+55aFw+E9GT7TKC_EgPTVcvHR8HDSipNPa7VQ1ASeL1M68xMQ@mail.gmail.com/#t",
		"items": [
			{
				"itemType": "email",
				"subject": "Re: Hash algorithm analysis",
				"creators": [
					{
						"firstName": "Linus",
						"lastName": "Torvalds",
						"creatorType": "author"
					}
				],
				"date": "Mon, 11 Jun 2018 13:20:46 -0700",
				"shortTitle": "PublicInbox",
				"url": "https://public-inbox.org/git/CA+55aFw+E9GT7TKC_EgPTVcvHR8HDSipNPa7VQ1ASeL1M68xMQ@mail.gmail.com/",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
