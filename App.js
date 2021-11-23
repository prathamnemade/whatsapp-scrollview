import React from "react";
import { Fragment } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Row from "./Row";

const DATA = [
  {
    id: 1,
    first_name: "Alfie",
    last_name: "Bagehot",
    email: "abagehot0@cam.ac.uk",
    photo: "http://dummyimage.com/103x100.png/cc0000/ffffff",
  },
  {
    id: 2,
    first_name: "Kirstyn",
    last_name: "Cobson",
    email: "kcobson1@sun.com",
    photo: "http://dummyimage.com/230x100.png/dddddd/000000",
  },
  {
    id: 3,
    first_name: "Elane",
    last_name: "McMurraya",
    email: "emcmurraya2@1und1.de",
    photo: "http://dummyimage.com/158x100.png/ff4444/ffffff",
  },
  {
    id: 4,
    first_name: "Arabella",
    last_name: "Rambaut",
    email: "arambaut3@wordpress.com",
    photo: "http://dummyimage.com/120x100.png/5fa2dd/ffffff",
  },
  {
    id: 5,
    first_name: "Leonanie",
    last_name: "Cawthron",
    email: "lcawthron4@sakura.ne.jp",
    photo: "http://dummyimage.com/182x100.png/5fa2dd/ffffff",
  },
  {
    id: 6,
    first_name: "Andie",
    last_name: "Matussov",
    email: "amatussov5@bloomberg.com",
    photo: "http://dummyimage.com/188x100.png/cc0000/ffffff",
  },
  {
    id: 7,
    first_name: "Aida",
    last_name: "Suddaby",
    email: "asuddaby6@dailymail.co.uk",
    photo: "http://dummyimage.com/143x100.png/dddddd/000000",
  },
  {
    id: 8,
    first_name: "Arnuad",
    last_name: "Andretti",
    email: "aandretti7@icq.com",
    photo: "http://dummyimage.com/224x100.png/5fa2dd/ffffff",
  },
  {
    id: 9,
    first_name: "Liuka",
    last_name: "Melland",
    email: "lmelland8@soup.io",
    photo: "http://dummyimage.com/180x100.png/cc0000/ffffff",
  },
  {
    id: 10,
    first_name: "Franzen",
    last_name: "Mc Gorley",
    email: "fmcgorley9@gmpg.org",
    photo: "http://dummyimage.com/242x100.png/cc0000/ffffff",
  },
  {
    id: 11,
    first_name: "Luelle",
    last_name: "Pybworth",
    email: "lpybwortha@hatena.ne.jp",
    photo: "http://dummyimage.com/198x100.png/dddddd/000000",
  },
  {
    id: 12,
    first_name: "Petra",
    last_name: "Alner",
    email: "palnerb@oaic.gov.au",
    photo: "http://dummyimage.com/227x100.png/ff4444/ffffff",
  },
  {
    id: 13,
    first_name: "Amber",
    last_name: "Beynkn",
    email: "abeynknc@phoca.cz",
    photo: "http://dummyimage.com/217x100.png/cc0000/ffffff",
  },
  {
    id: 14,
    first_name: "Doe",
    last_name: "Mayberry",
    email: "dmayberryd@list-manage.com",
    photo: "http://dummyimage.com/214x100.png/5fa2dd/ffffff",
  },
  {
    id: 15,
    first_name: "Noellyn",
    last_name: "Maciejak",
    email: "nmaciejake@japanpost.jp",
    photo: "http://dummyimage.com/232x100.png/ff4444/ffffff",
  },
  {
    id: 16,
    first_name: "Meggi",
    last_name: "Dinis",
    email: "mdinisf@acquirethisname.com",
    photo: "http://dummyimage.com/140x100.png/dddddd/000000",
  },
  {
    id: 17,
    first_name: "Arvie",
    last_name: "Girardez",
    email: "agirardezg@craigslist.org",
    photo: "http://dummyimage.com/206x100.png/cc0000/ffffff",
  },
  {
    id: 18,
    first_name: "Dov",
    last_name: "Remnant",
    email: "dremnanth@netscape.com",
    photo: "http://dummyimage.com/155x100.png/cc0000/ffffff",
  },
  {
    id: 19,
    first_name: "Reuben",
    last_name: "Patriskson",
    email: "rpatrisksoni@bloomberg.com",
    photo: "http://dummyimage.com/207x100.png/dddddd/000000",
  },
  {
    id: 20,
    first_name: "Dalila",
    last_name: "Szubert",
    email: "dszubertj@last.fm",
    photo: "http://dummyimage.com/197x100.png/dddddd/000000",
  },
  {
    id: 21,
    first_name: "Sigismond",
    last_name: "Tregunna",
    email: "stregunnak@bing.com",
    photo: "http://dummyimage.com/214x100.png/cc0000/ffffff",
  },
  {
    id: 22,
    first_name: "Madalyn",
    last_name: "Claypole",
    email: "mclaypolel@shareasale.com",
    photo: "http://dummyimage.com/218x100.png/ff4444/ffffff",
  },
  {
    id: 23,
    first_name: "Desirae",
    last_name: "Dreher",
    email: "ddreherm@yellowpages.com",
    photo: "http://dummyimage.com/236x100.png/5fa2dd/ffffff",
  },
  {
    id: 24,
    first_name: "Prentiss",
    last_name: "Philpott",
    email: "pphilpottn@bluehost.com",
    photo: "http://dummyimage.com/133x100.png/5fa2dd/ffffff",
  },
  {
    id: 25,
    first_name: "Thekla",
    last_name: "Vowles",
    email: "tvowleso@unblog.fr",
    photo: "http://dummyimage.com/203x100.png/dddddd/000000",
  },
  {
    id: 26,
    first_name: "Prinz",
    last_name: "Swanne",
    email: "pswannep@bigcartel.com",
    photo: "http://dummyimage.com/133x100.png/ff4444/ffffff",
  },
  {
    id: 27,
    first_name: "Rand",
    last_name: "Peevor",
    email: "rpeevorq@pen.io",
    photo: "http://dummyimage.com/130x100.png/dddddd/000000",
  },
  {
    id: 28,
    first_name: "Marleen",
    last_name: "Emlyn",
    email: "memlynr@taobao.com",
    photo: "http://dummyimage.com/143x100.png/cc0000/ffffff",
  },
  {
    id: 29,
    first_name: "Eydie",
    last_name: "Kleinlerer",
    email: "ekleinlerers@thetimes.co.uk",
    photo: "http://dummyimage.com/196x100.png/5fa2dd/ffffff",
  },
  {
    id: 30,
    first_name: "Armstrong",
    last_name: "Sherman",
    email: "ashermant@virginia.edu",
    photo: "http://dummyimage.com/188x100.png/dddddd/000000",
  },
  {
    id: 31,
    first_name: "Yvon",
    last_name: "Smoughton",
    email: "ysmoughtonu@wikia.com",
    photo: "http://dummyimage.com/246x100.png/cc0000/ffffff",
  },
  {
    id: 32,
    first_name: "Marguerite",
    last_name: "Blowen",
    email: "mblowenv@sun.com",
    photo: "http://dummyimage.com/224x100.png/ff4444/ffffff",
  },
  {
    id: 33,
    first_name: "Bryn",
    last_name: "Phillpot",
    email: "bphillpotw@dion.ne.jp",
    photo: "http://dummyimage.com/130x100.png/ff4444/ffffff",
  },
  {
    id: 34,
    first_name: "Carissa",
    last_name: "Evamy",
    email: "cevamyx@exblog.jp",
    photo: "http://dummyimage.com/173x100.png/5fa2dd/ffffff",
  },
  {
    id: 35,
    first_name: "Niel",
    last_name: "Alldis",
    email: "nalldisy@typepad.com",
    photo: "http://dummyimage.com/145x100.png/cc0000/ffffff",
  },
  {
    id: 36,
    first_name: "Petronella",
    last_name: "Witter",
    email: "pwitterz@imageshack.us",
    photo: "http://dummyimage.com/244x100.png/5fa2dd/ffffff",
  },
  {
    id: 37,
    first_name: "Brande",
    last_name: "Tudbald",
    email: "btudbald10@google.fr",
    photo: "http://dummyimage.com/225x100.png/cc0000/ffffff",
  },
  {
    id: 38,
    first_name: "Florella",
    last_name: "Woffenden",
    email: "fwoffenden11@nyu.edu",
    photo: "http://dummyimage.com/175x100.png/cc0000/ffffff",
  },
  {
    id: 39,
    first_name: "Marcelline",
    last_name: "Caughte",
    email: "mcaughte12@stanford.edu",
    photo: "http://dummyimage.com/208x100.png/dddddd/000000",
  },
  {
    id: 40,
    first_name: "Susanne",
    last_name: "Abramin",
    email: "sabramin13@yellowpages.com",
    photo: "http://dummyimage.com/245x100.png/cc0000/ffffff",
  },
  {
    id: 41,
    first_name: "Gratiana",
    last_name: "Piscopello",
    email: "gpiscopello14@wikimedia.org",
    photo: "http://dummyimage.com/155x100.png/cc0000/ffffff",
  },
  {
    id: 42,
    first_name: "Shauna",
    last_name: "Bazoge",
    email: "sbazoge15@webnode.com",
    photo: "http://dummyimage.com/229x100.png/cc0000/ffffff",
  },
  {
    id: 43,
    first_name: "Alley",
    last_name: "Downey",
    email: "adowney16@cloudflare.com",
    photo: "http://dummyimage.com/110x100.png/ff4444/ffffff",
  },
  {
    id: 44,
    first_name: "Tina",
    last_name: "Sutehall",
    email: "tsutehall17@admin.ch",
    photo: "http://dummyimage.com/149x100.png/cc0000/ffffff",
  },
  {
    id: 45,
    first_name: "Casey",
    last_name: "Tanton",
    email: "ctanton18@surveymonkey.com",
    photo: "http://dummyimage.com/214x100.png/cc0000/ffffff",
  },
  {
    id: 46,
    first_name: "Jacquenetta",
    last_name: "Bellham",
    email: "jbellham19@goo.ne.jp",
    photo: "http://dummyimage.com/126x100.png/dddddd/000000",
  },
  {
    id: 47,
    first_name: "Carilyn",
    last_name: "Genn",
    email: "cgenn1a@canalblog.com",
    photo: "http://dummyimage.com/189x100.png/cc0000/ffffff",
  },
  {
    id: 48,
    first_name: "Gwynne",
    last_name: "Coopper",
    email: "gcoopper1b@weather.com",
    photo: "http://dummyimage.com/199x100.png/5fa2dd/ffffff",
  },
  {
    id: 49,
    first_name: "Frank",
    last_name: "Grass",
    email: "fgrass1c@webnode.com",
    photo: "http://dummyimage.com/110x100.png/ff4444/ffffff",
  },
  {
    id: 50,
    first_name: "Mallory",
    last_name: "Pymm",
    email: "mpymm1d@spiegel.de",
    photo: "http://dummyimage.com/152x100.png/cc0000/ffffff",
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {DATA.map((item) => (
          <Fragment key={item.id}>
            <Row {...{ item }} />
          </Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ff0000",
  },
});
