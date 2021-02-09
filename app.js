new Vue({
    el : "#app",
    data : {
        player_heal : 100,
        monster_heal : 100,
        logs : [],
        game_is_on : false,
        game_is_off : true,
        attack_multiple : 10,
        special_attack_multiple : 25,
        special_monster_attack_multiple : 25,
        heal_up_multiple : 20,
        monster_attack_multiple : 25,
        counter_attack : 0,
        counter_special_attack : 0,
        counter_special_monster_attack : 0,
        counter_heal_up : 0,
        counter_toplam_hamle : 0, 

        log_text : {
            attack : " OYUNCU ATAĞI :",
            special_attack : " ÖZEL OYUNCU ATAĞI : ",
            special_attack_monster : "ÖZEL CANAVAR ATAĞI : ",
            monster_attack : "CANAVAR ATAĞI : ",
            heal_up : "İLK YARDIM :",
            give_up : "OYUNCU PES ETTİ!"

        },
        


    },

    methods : {
    
        start_game : function(){
            this.game_is_on = true;

        },

        attack : function(){
            var point = Math.ceil(Math.random() * this.attack_multiple);
             //this.monster_heal = this.monster_heal - point;
             this.monster_heal-=point;
             this.add_to_log({ turn : "p", text : this.log_text.attack + point})
            //  this.counter_attack = this.counter_attack + 1 
            this.counter_attack++
            this.monster_attack();
            this.toplam_hamle();
             
        },

        special_attack : function(){
            var point = Math.ceil(Math.random() * this.special_attack_multiple);
            //this.monster_heal = this.monster_heal - point;
            this.monster_heal-=point;
            this.add_to_log({ turn : "p", text : this.log_text.special_attack + point })
            this.counter_special_attack++
            this.monster_attack();
            this.toplam_hamle();

           
       },

       special_monster_attack : function(){
           var point = Math.ceil(Math.random() * this.special_monster_attack_multiple);
        //    if(this.monster_heal >= 100) {
        //     this.monster_heal+= 0
        //    } else {
        //     this.monster_heal+=point
        //    }
           this.monster_heal+= this.monster_heal >= 100 ? 0 : point
           this.monster_heal = this.monster_heal > 100 ? 100 : this.monster_heal
           this.add_to_log({ turn : "m", text: this.log_text.special_attack_monster  + point })
           this.counter_special_monster_attack++
           this.monster_attack();
           this.toplam_hamle();
       },


        heal_up : function(){
            var point = Math.ceil(Math.random() * this.heal_up_multiple);
            //this.monster_heal = this.monster_heal - point;
            this.player_heal+=point;
            this.add_to_log({ turn : "p", text :this.log_text.heal_up + point })
            this.counter_heal_up++
            this.monster_attack();
            this.toplam_hamle();

        },

        give_up : function(){
            this.player_heal = 0;
            this.add_to_log({ turn : "p", text : this.log_text.give_up})
            
        },
         
        monster_attack : function(){
            var point = Math.ceil(Math.random() * this.monster_attack_multiple);
             //this.monster_heal = this.monster_heal - point;
             this.player_heal-=point;
             this.add_to_log({ turn : "m", text : this.log_text.monster_attack + point })

        },

        toplam_hamle : function(){
            this.counter_toplam_hamle++
            
        },

        add_to_log : function(log){
            this.logs.push(log);

        }
    },
    watch : {
        player_heal : function(value){
            if(value <= 0){
                this.player_heal = 0;
                if(confirm("Oyunu kaybettin. Tekrar oynamak ister misin?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.counter_attack = 0;
                    this.counter_special_attack = 0;
                    this.counter_special_monster_attack = 0;
                    this.counter_heal_up = 0;
                    this.counter_toplam_hamle = 0 ;
                    this.logs = [];
                }
            } else if(value >= 100){
                this.player_heal = 100

            }
        },

        monster_heal : function(value){
            if(value <= 0){
                this.monster_heal = 0;
                if(confirm("Oyunu kazandın. Tekrar oynamak ister misin?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.counter_attack = 0;
                    this.counter_special_attack = 0;
                    this.counter_special_monster_attack = 0;
                    this.counter_heal_up = 0;
                    this.counter_toplam_hamle = 0;
                    this.logs = [];

                }
            } 
            
        }
    },

        computed : {
            player_progress : function(){
                return {
                    width : this.player_heal + '%'
                }
            },
            monster_progress : function(){
                return{
                    width : this.monster_heal + '%'
                }
            }
        }

    
})