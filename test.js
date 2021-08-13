const solution = (arr) => {
	const result = []
	arr.forEach(item => {
		if (!item.pid) {
			result.push(item)
		} else {
			const parent = arr.find(a => a._id === item.pid._id)
			Array.isArray(parent.children) ? parent.children.push(item) : parent.children = [item]
		}
	})
	return result
}

const data = [
	{
			"_id": "2d44d6c26110d22203f5fbf95484b816",
			"comment_content": "测试评论",
			"article_id": "cd045e756102b0b600e6153e7dc3e678",
			"comment_author": {
				"name": "用户97.89556629736191",
				"email": "用户52.8973290551612@github.com"
			}
		},
		{
			"_id": "14139e126110d75503f2df4a0354e831",
			"comment_content": "第二条评论",
			"article_id": "cd045e756102b0b600e6153e7dc3e678",
			"comment_author": {
				"name": "用户27.064798298154493",
				"email": "用户97.70539438271202@github.com"
			}
		},
		{
			"_id": "cd045e7561121d9404c02e1a61856780",
			"comment_content": "大萨达",
			"article_id": "8937eaa96102b10200bc97bd4e2c6183",
			"comment_author": {
				"name": "用户45.88242116867542",
				"email": "用户36.95435829054714@github.com"
			}
		},
		{
			"_id": "14139e1261129806045420e93a9a9922",
			"comment_content": "二级评论",
			"reply_content": "二级评论",
			"pid": {
				"_id": "2d44d6c26110d22203f5fbf95484b816",
				"comment_content": "测试评论",
				"article_id": "cd045e756102b0b600e6153e7dc3e678",
				"comment_author": {
					"name": "用户97.89556629736191",
					"email": "用户52.8973290551612@github.com"
				}
			},
			"comment_author": {
				"name": "用户79.29663107058975",
				"email": "用户63.831949036364335@github.com"
			}
		}
	]



console.log(JSON.stringify(solution(data)))
