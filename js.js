$(document).ready(function(){

  var in_file = "";
  var obj = "";
  var content = [];
  var names = [];
  var grouh=[];
  var val2 = $('#this').val()
  checkempty2(val2)
  
  $("#modal1").css("display" , "block");
  $("#inputfile").change(function(){
    var fr= new FileReader();
    $("#modal1").css("display" , "none");
    fr.onload = function(){
      in_file=fr.result;
      obj = JSON.parse(in_file);
      
      for (x in obj) {
        
        content.push(obj[x])
        names.push(obj[x].title)
        grouh.push(obj[x].group)
      
      }
    
      ons()
    
    }
    
    fr.readAsText(this.files[0]);
  
  })

  function erase(){
      $('table tr:not(#first)').remove()
      $('#final_date').text('')
      $('#teacher').text('')
      $('#gender').text('')
      $('#unit').text('')
      $('#vahed').text('')
      $('#time_room').text('')

  }
  
  function ons(){
    $('button').on({click:erase})   
    $('input').on({keyup:search})
    $('.title').on({click:slide_toggle})
    $('#this').on('keydown',function(e){
      
      if( e.key=="ک" ){
        
        e.preventDefault();
        var newstring = $('#this').val()+'ك'
        $('#this').val(newstring)
      
      } 
       
      if( e.key=="ی" ){
        
        e.preventDefault();
        var newstring = $('#this').val()+'ي'
        $('#this').val(newstring)
       
       }
    })
    $('div.suggestbox div p ').on({click:add_to_history})
    $('table tr:not(#first) ').on({click:add_to_information})  


  }
  
  function slide_toggle(){
    $(this).next().toggle()
    $('.title').off()
    $('button').off()   
    $('input').off()
    $('div.suggestbox div p ').off()
    $('table tr:not(#first) ').off()      
    ons()
  
  }
  
  function add_to_history(){
    var counter = 0;
    var Nam=content[$(this).attr('id')].title;
    var id =$(this).attr('id');
    var goroh = content[$(this).attr('id')].group;
    $('#this').val($(this).text())
    $('#teacher').text(content[$(this).attr('id')].teacher)
    $('#gender').text(content[$(this).attr('id')].gender)
    $('#vahed').text(content[$(this).attr('id')].vahed)
    $('#unit').text(content[$(this).attr('id')].unit)
    $('#time_room').text(content[$(this).attr('id')].time_room)
    $('#final_date').text(content[$(this).attr('id')].final_date)
    $('table tr:first-of-type').after('<tr id='+id+'><td>'+(goroh)+'</td><td>'+(Nam)+'</td></tr>')
    $('div.main2 table.history tr').each(function(){
      if ($(this).children().eq(1).text()==Nam && $(this).children().eq(0).text()==goroh){

        if(counter!=0){
        
          //'table.history tr#'+id
          $(this).remove()
        
        }
        else{
        
          counter++;
        
        }
      }
    
    }) 
    $('div.suggestbox div p ').off()
    $('.title').off()
    $('button').off()   
    $('input').off()
    $('table tr:not(#first) ').off()
    ons()
    checkempty3()
  }  
  
  function add_to_information(){
    $('#this').val(content[$(this).attr('id')].title)
    $('#teacher').text(content[$(this).attr('id')].teacher)
    $('#title').text(content[$(this).attr('id')].title)
    $('#gender').text(content[$(this).attr('id')].gender)
    $('#vahed').text(content[$(this).attr('id')].vahed)
    $('#unit').text(content[$(this).attr('id')].unit)
    $('#time_room').text(content[$(this).attr('id')].time_room)
    $('#final_date').text(content[$(this).attr('id')].final_date)
    $('table tr:not(#first) ').off()
    $('.title').off()
    $('button').off()   
    $('input').off()
    $('div.suggestbox div p ').off()
    ons()
    checkempty3()
  }  
  function checkempty3(){
    $('.down').each(function(){
      if($(this).text()==''){$(this).text('"نامشخص  "')}
    })
  }
  //$(this).text()==null
  function read_for_suggestbox(a,b,g){
    
    $('div.suggestbox div:not(#empty)').remove()
    
    for(i in a){
      
    $('div.suggestbox div:last-of-type').after('<div><p id='+b[i]+'>'+a[i]+' , '+'گروه ' +g[i]+'</p></div>')
    }
   ons()
  }

  function checkempty(b){
    
    if(b.length==0){
      
      $('div.main div.suggestbox div#empty').show();  
    
    }
  
    else{
  
      $('div.main div.suggestbox div#empty').hide();
    }
  
  }
  function checkempty2(v){
    if(v.length==0){
      $('.suggestbox').hide()
    }
    else{
      $('.suggestbox').show()
    }
  
  }
  
  
  
  function search(){
    
    var value = $('#this').val()
    var box =[];
    var nums=[];
    var groups=[];
    
    checkempty2(value)
    
    if(value.length!=0){  
      for (i in names) {  
        if(names[i].search(value)!=-1){
    
          box.push(names[i])
          nums.push(i)
          groups.push(grouh[i])
        
        }
      }
    }
    $('#this').off()
    checkempty(box)
    read_for_suggestbox(box,nums,groups)
  }

})
	