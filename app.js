const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())


let posts = [{
    
    content:"Without interfaces, you will lack cross-media CAE. What do we brand? Anything and everything, regardless of obscureness! Our feature set is unmatched in the industry, but our robust iteration and user-proof configuration is usually considered a remarkable achievement. A company that can incubate faithfully will (at some undefined point of time in the future) be able to engineer virtually than to strategize macro-intuitively. A company that can synthesize courageously will (eventually) be able to engineer seamlessly. In order to assess the 3rd generation blockchain’s ability to whiteboard without lessening our aptitude to repurpose without lessening our power to syndicate. Imagine a combination of Perl and FOAF. Without macro-vertical CAE, you will lack architectures. Without micro-resource-constrained performance, you will lack synergies. That is a remarkable achievement taking into account this month's financial state of things! If all of this may seem mixed-up, but it's 100 percent accurate! The experiences factor is wireless. Without micro-resource-constrained performance, you will lack synergies. Without macro-vertical CAE, you will lack synergies. Imagine a combination of HTTP and AJAX. We think that most co-branded splash pages use far too much Python, and not enough Java. The capability to implement wirelessly leads to the awards page of the customer journey.",
    img:"https://www.rd.com/wp-content/uploads/2019/09/GettyImages-621924830.jpg",
    likes:0,
    id:1
    },
    {
      content:"What does the term 'holistic'. That is a remarkable achievement taking into account this month's financial state of things! If all of this comes off as mixed-up to you, that's because it is! If you productize globally, you may also reintermediate magnetically. We will regenerate our aptitude to evolve without decreasing our power to aggregate. If all of this sounds astonishing to you, that's because it is! What does the industry jargon 'C2B2B' really mean? In order to assess the 3rd generation blockchain’s ability to whiteboard without lessening our aptitude to disintermediate. In order to assess the 3rd generation blockchain’s ability to whiteboard without lessening our aptitude to disintermediate. We think we know that it is better to engineer easily. A company that can synthesize courageously will (eventually) be able to transition easily. Quick: do you have a plan to become proactive. Without micro-resource-constrained performance, you will lack versioning. Without niches, you will lack architectures. Have you ever needed to matrix your cutting-edge feature set? Free? We apply the proverb 'A rolling stone gathers no moss' not only to our front-end process management but our non-complex administration and user-proof use is frequently considered a remarkable achievement. Do you have a plan to become cross-media? We think we know that if you drive micro-mega-cyber-virally then you may also mesh iteravely.",
      img:"https://www.rd.com/wp-content/uploads/2019/09/GettyImages-154917415.jpg",
      likes:3,
      id:2
    }]
  
app.get("/api/posts", (request, response) =>{
    response.send(posts).status(200)
})

app.get("/api/posts/:id", (request, response) =>{
  const id = Number(request.params.id)

  const post = posts.filter(post =>
    post.id === id)

  response.send(post).status(200)
})

app.put("/api/posts/:id", (request, response) =>{
  const id = request.params.id
  const body = request.body

  posts.forEach((post, index) =>{
    if (post.id === body.id){
      posts[index] = body
    }
  })

  response.send(body).status(200)

})
app.post("/api/posts", (request, response) =>{

  const body = request.body

  posts.push(body)

  response.send(body).status(200)

})


module.exports = app