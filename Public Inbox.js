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
	"lastUpdated": "2018-06-12 15:05:36"
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

  var dateHeader = get_header(response, 'Date')
  email.date = format_date(dateHeader)

  email.title = get_header(response, 'Subject')
  email.url = url

  email.creators.push(ZU.cleanAuthor(authorName, 'author'))

  email.shortTitle = 'Public Inbox'

  email.language = 'en'
  email.accessDate = 'CURRENT_TIMESTAMP'

  //email.author = from
  email.complete()
  })
}

function get_header(doc, header) {
  var pattern = "^" + header + "\:(.*)"
  var reg = new RegExp(pattern, "gm")
  var from = reg.exec(doc)[1]

  return from
}

function format_date(date_str) {
  var date = {'year': 0, 'month': 0, 'day': 0}
  var month = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'}

  var datePattern = new RegExp(/\w{3}, (\d{1,2}) (\w{3}) (\d{4})/)
  var dateMatch = datePattern.exec(date_str)

  date.day = dateMatch[1]
  date.month = month[dateMatch[2]]
  date.year = dateMatch[3]

  var fDate = Object.keys(date).map(function (x) { return date[x] }).join('-')

  return fDate
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
				"date": "2018-06-11",
				"language": "en",
				"shortTitle": "Public Inbox",
				"url": "https://public-inbox.org/git/CA+55aFw+E9GT7TKC_EgPTVcvHR8HDSipNPa7VQ1ASeL1M68xMQ@mail.gmail.com/",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://public-inbox.org/git/20180606113611.87822-1-dstolee@microsoft.com/",
		"items": [
			{
				"itemType": "email",
				"subject": "[PATCH v5 00/21] Integrate commit-graph into 'fsck' and 'gc'",
				"creators": [
					{
						"firstName": "Derrick",
						"lastName": "Stolee",
						"creatorType": "author"
					}
				],
				"date": "2018-06-6",
				"language": "en",
				"shortTitle": "Public Inbox",
				"url": "https://public-inbox.org/git/20180606113611.87822-1-dstolee@microsoft.com/",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
