import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message';
import { map } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { BotResponseMessage } from 'src/botResponseMessage';
import { LuisaiService } from 'src/luisai.service';
import { HttpClient } from '@angular/common/http';
import { SendService } from '../send.service';
import { ReceiveService } from '../receive.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  message: Message;
  // responseMessage: Message;

  responseMessage: Message = {
    "content": "",
    "answer": "",
    "timestamp": new Date(),
    "user": "User",
  };

  url: string = "http://localhost:3000/tweetList/";
  geturl: string = "http://localhost:3000/response/"
  @Input('messages')
  messages: Message[];

  private botResponseConverter: BotResponseMessage = null;
  enable: boolean = true;
  //private hasSaidHello = false;
  //private hasSaidHi = false;
  //private hasSaidHowdy = false;
  //private hasSaidBigHi = false;
  qandA = []
  charteandb: any = false;
  phoneNOToast: boolean;
  img: any;

  constructor(private gm: ReceiveService, private pm: SendService, private http: HttpClient, private activeRoute: ActivatedRoute) {
    //  this.botResponseConverter = new BotResponseMessage();
  }

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((d: any)=>{
      switch (d?.params.company) {
        case "1":
          this.img = "card.jpg"
          break;
        case "2":
          this.img = "empower.jpg"
          break;
        case "3":
          this.img = "global.jpg"
          break;
        default:
          this.img = "global.jpg"
          break

      }
    
    })
    this.qandA = this.getQ()
    this.message = new Message('', '', false);
    // var startingMessage = new Message('Hi this is an easy answer bot', '', true);
    this.messages = [];
    // this.addToMessage(this.message);
    this.getQandA();
  }

  public handleEnter(event): void {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  };

  private addToMessage(message) {
    // if (this.messages.length > 7) {
    //   this.messages.splice(0, 1);
    // }

    this.enable = false;

    this.messages.push(message);
    this.enable = true;
  }

  public sendMessage(): void {
    const numberCheck: any = this.message.content;
    this.phoneNOToast = false
    if (!isNaN(numberCheck)) {

      if (numberCheck.length == 10) {
        this.message.content = "";
        alert("Phone number is not allowed")

        this.phoneNOToast = true
        return;
      }
    }
    const data = this.qandA.find(d => d.question.toLowerCase() == this.message.content.toLowerCase())

    const res1 = JSON.parse(JSON.stringify(this.message))
    res1.answer = "";
    res1.user = "User"
    res1.timestamp = new Date();
    this.addToMessage(res1);

    setTimeout(() => {
      const res = JSON.parse(JSON.stringify(this.message))
      res.answer = data.answer;
      res.content = "";
      res.user = "Bot"
      this.addToMessage(res);
      this.message.content =""
    }, 1500)

    // this.getMessage();

    // this.message = new Message('', '', false);

  }

  public getMessage(): Message {
    this.gm.getMessage().subscribe(
      (response) => {
        this.responseMessage = response[0];
        this.addToMessage(this.responseMessage);
      },
      (error) => {
        console.log("Error Occured")
      }
    );
    return this.responseMessage;
  }


  public postMessage(): void {

    this.http.post(this.url, this.message).subscribe(
      response => {
      },
      (error) => {
        console.log("Error Occured")
      }
    );

  }

  getQandA() {
    this.gm.QandA().subscribe((data: any) => {

    })
  }

  enableDisable() {
    this.charteandb = !this.charteandb
  }

  private getBotResponseMessage(luisResult) {
    if (luisResult.topScoringIntent && luisResult.entities) {
      return this.botResponseConverter.getBotResponse(luisResult);
    } else {
      return "I'm sorry I'm not sure how to reply... check your spelling and try again. Thanks!";
    }
  }


  getQ() {
    return [{
      "question": "Hi",
      "answer": "Hi Ashish, How are you doing! How can I help you today?"
    },
    {
      "question": "Who are you?",
      "answer": "I am Rakumi, an artificial intelligence assistant trained to assist with a variety of tasks and answer questions to the best of my ability. I do not have personal experiences or feelings, and exist solely to provide information and assistance to Rakuten family i.e. customers, merchants and employees. Is there anything specific you would like to know or discuss?"
    },
    {
      "question": "What is Rakuten?",
      "answer": "Rakuten is a Japanese e-commerce and internet company that operates a number of online retail and service websites, including Rakuten Ichiba, the largest e-commerce site in Japan. Rakuten also operates a number of other businesses, including a credit card company, a travel agency, and a mobile phone operator. The company was founded in 1997 and is headquartered in Tokyo, Japan. Rakuten is known for offering a wide variety of products and services, including electronics, clothing, home goods, and more. It has a strong presence in Japan and also operates internationally in countries such as the United States, Europe, and Asia."
    },

    {
      "question": "How do I place an order on your website?",
      "answer": "To place an order on our website, add the items you wish to purchase to your shopping cart and follow the prompts to checkout. You will be asked to provide your shipping and payment information before submitting your order."
    },
    {
      "question": "How do I track my order?",
      "answer": "You can track your order by logging into your account on our website or by using the tracking number provided in your shipping confirmation email."
    },
    {
      "question": "Can I cancel or change my order?",
      "answer": "In most cases, you can cancel or change your order as long as it has not yet been shipped. To request a change or cancellation, please contact our customer care team as soon as possible."
    },
    {
      "question": "How do I return an item I purchased?",
      "answer": "To return an item you purchased, please contact our customer care team to request a return authorization. You will be provided with instructions on how to return the item and may be required to pay for the return shipping costs."
    },
    {
      "question": "How do I exchange an item I purchased?",
      "answer": "To exchange an item you purchased, please contact our customer care team to request an exchange. Depending on the item and the availability of the replacement, we may be able to offer an exchange or a store credit."
    },
    {
      "question": "Can I get a refund for my purchase?",
      "answer": "If you are eligible for a refund, you can request one by contacting our customer care team. Our refund policy varies depending on the item and the reason for the request."
    },
    {
      "question": "How long will it take to receive my order?",
      "answer": "The time it takes to receive your order will depend on the shipping option you choose and the location of the delivery address. You can find more information about our shipping options and estimated delivery times on our website."
    },
    {
      "question": "What are the shipping options and costs?",
      "answer": "We offer a variety of shipping options, including standard, expedited, and next-day delivery. The cost of shipping will depend on the weight and size of your order, as well as the shipping destination."
    },
    {
      "question": "How do I use a promo code or coupon?",
      "answer": "To use a promo code or coupon, enter the code in the designated field during the checkout process. The discount will be applied to your order if the code is valid and has not expired."
    },
    {
      "question": "What is your return policy?",
      "answer": "Our return policy allows customers to return most items within a certain timeframe for a full refund or store credit. Please see our website or contact our customer care team for more information on our specific return policy."
    },
    {
      "question": "What is your exchange policy?",
      "answer": "Our exchange policy allows customers to exchange most items within a certain timeframe for a different size, color, or style. Please see our website or contact our customer care team for more information on our specific exchange policy."
    },
    {
      "question": "What is your refund policy?",
      "answer": "Our refund policy allows customers to request a refund for most items within a certain timeframe. The eligibility for a refund and the amount of the refund will depend on the item and the reason for the request. Please see our website or contact our customer care team for more information on our specific refund policy."
    },
    {
      "question": "How do I contact you for customer support?",
      "answer": "You can contact our customer care team through our website, by email, or by phone. Our contact information can be found on our website or in the confirmation email you received after placing your order."
    },
    {
      "question": "How do I file a complaint?",
      "answer": "To file a complaint, please contact our customer care team through our website, by email, or by phone. Our contact information can be found on our website or in the confirmation email you received after placing your order."
    },
    {
      "question": "How do I resolve a dispute with my order?",
      "answer": "To resolve a dispute with your order, please contact our customer care team through our website, by email, or by phone. Our contact information can be found on our website or in the confirmation email you received after placing your order."
    },
    {
      "question": "How do I request a replacement for a defective item?",
      "answer": "To request a replacement for a defective item, please contact our customer care team through our website, by email, or by phone. Our contact information can be found on our website or in the confirmation email you received after placing your order."
    },
    {
      "question": "How do I request a warranty claim?",
      "answer": "To request a warranty claim, please contact our customer care team through our website, by email, or by phone"
    },
    {
      "question": "You are Awesome!",
      "answer": "Thank you for the kind words! I'm just a computer program, but I'm here to do my best to assist you with any questions or problems you have. Is there anything specific you'd like to know or discuss?"
    },
    {
      "question": "Who is your daddy?",
      "answer": "I am Rakumi, a computer program created by a team of researchers at Rakuten. I don't have a physical body or a parent in the same way that a human does. I was created using advanced machine learning techniques, and I exist to provide information and assistance to users like you. If you have any specific questions about me or how I work, feel free to ask!"
    },
    {
      "question": "How do you learn?",
      "answer": "As a large language model, I was trained on a massive dataset of text from the internet and other sources. This dataset contains billions of words and phrases, and I was trained to predict the next word or sequence of words in a given text. During the training process, I was presented with this text one word or phrase at a time, and I used statistical techniques to learn the patterns and relationships in the data. This allowed me to learn about the structure and meaning of language, as well as the context in which words and phrases are used. I can then use this knowledge to generate human-like text, answer questions, and perform other language-related tasks."
    }
    ]
  }




}





/* switch (this.message.content) {
   case "Hi":
   case "HI":
   case "hi":
     var hiMessage = new Message('Hi!', true);
     this.addToMessage(hiMessage);
     this.hasSaidHi = true;
     break;

   case "Howdy":
   case "howdy":
     var hiMessage = new Message('Howdy!!', true);
     this.addToMessage(hiMessage);
     this.hasSaidHowdy = true;
     break;

   case "Hello":
   case "hello":
     var hiMessage = new Message('Hello!!!', true);
     this.addToMessage(hiMessage);
     this.hasSaidHello = true;
     break;
   
   case "goodbye":
     var goodByeMessage = new Message('Good bye!!!! Have a great day!', true);
     this.addToMessage(goodByeMessage);
     break;

   default:*/
/* this.luisAIService.getResponse(this.message.content).pipe(
   map((res: Response) => res.text())
 )
 .subscribe(
   luisResult => {
     var luisResultJSON = JSON.parse(luisResult.toString());
     var result = this.getBotResponseMessage(luisResultJSON);
     var botMessage = new Message(result, true);
     this.addToMessage(botMessage);
   },
   err => console.log(err),
   () => console.log("No errors to report!")
 );
 break; */


/* if (this.hasSaidHello && this.hasSaidHi && this.hasSaidHowdy && !this.hasSaidBigHi) {
   var bigHiMessage = new Message('Ok ok i get it HI! Howdy! and Hello! Have a great one!', true);
   this.addToMessage(bigHiMessage);
   this.hasSaidBigHi = true;
 }

 this.message = new Message('', false);
} */


