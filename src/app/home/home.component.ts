import { Component,ViewChild,ElementRef, AfterViewInit , OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import jspdf  from 'jspdf';
import html2canvas from 'html2canvas';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  value = '';
  @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef

  scrapList:{};
  imageToShow:any;
myURL:any;
socialMediaList=[]
  // onEnter(value: string) { 
  //   debugger
  //   this.value = value; 
  // }
 

  constructor(private http: HttpClient) {
  }

  ngOnInit() { 
  }
  Clear()
  {this.value='';
    this.scrapList=null;
    this.socialMediaList=[];
  }

  clickFunction() {

    this.showConfig();

  }


  convetToPDF()
  {

    
    debugger
    if(this.scrapList!=null)
    {
  var data = document.getElementById('contentToConvert');
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  var imgWidth = 208;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
   
  const contentDataURL = canvas.toDataURL('image/png')
  debugger
  let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  var position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save('new-file.pdf'); // Generated PDF
  });
  }
  }



  SaveScrapper() {
    debugger
    let headers: HttpHeaders = new HttpHeaders('Access-Control-Allow-Origin');
    headers = headers.append('Content-Type', 'application/json');
  
    //const headers = { 'content-type': 'application/json'}  
   
    const body=JSON.stringify(this.scrapList);
    this.http.post<any>('https://localhost:44348/api/home', body, { headers }).subscribe(data => {
     
  });

    
  }

  showConfig() {
   
    if(this.value=="")
    {
      alert("Please enter the Url")
      return false;
    }
   let header=new HttpHeaders();
   header.append('Accept', 'application/json');
   
    let params = new HttpParams().set('Url', this.value);
//params.append("Url", "https://www.amazon.in/diwali-great-indian-festival/b?ie=UTF8&node=3419926031&ext_vrnc=hi&tag=googhydrabk-21&ascsubtag=_k_EAIaIQobChMIvdjzw5Ky7AIVSHZgCh16WwyUEAAYASAAEgIicPD_BwE_k_&ext_vrnc=hi&gclid=EAIaIQobChMIvdjzw5Ky7AIVSHZgCh16WwyUEAAYASAAEgIicPD_BwE&network=g")
    this.http.get("https://localhost:44349/api/home", {
      headers:new HttpHeaders('Access-Control-Allow-Origin'),
      params: params,
    }).subscribe(data=>{
      debugger
     
      
      this.scrapList=data;

 
 
      var templist = ["www.facebook.com","www.youtube.com","www.twitter.com","www.linkedin.com"];
     var t= Object.values(data).filter(p=>p.hyperLinks.includes("https://www.facebook.com/"));
      
     for(var i=0;i <=data[0].hyperLinks.length-1;i++)
{
if(data[0].hyperLinks[i].includes("www.facebook.com"))
{
  this.socialMediaList.push(data[0].hyperLinks[i]);
  
}
if(data[0].hyperLinks[i].includes("www.twitter.com"))
{
  this.socialMediaList.push(data[0].hyperLinks[i]);
  
}
if(data[0].hyperLinks[i].includes("www.youtube.com"))
{
  this.socialMediaList.push(data[0].hyperLinks[i]);
  
}
if(data[0].hyperLinks[i].includes("www.linkedin.com"))
{
  this.socialMediaList.push(data[0].hyperLinks[i]);
  
}

}

    });


//     let headers = new Headers();
// headers.append('Content-Type', 'application/json');

// let params = new URLSearchParams();
// params.append("Url", "")
// //this.http.get('http://localhost:63203/api/CallCenter/GetSupport', { headers: headers, search: params })
//     this.http.get("https://jsonplaceholder.typicode.com/posts",{ headers: headers, search: params })
//       .subscribe((data) =>{
//         console.log(data);
//       });
//     }
  }
}
