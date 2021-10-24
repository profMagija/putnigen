const R_FIELDS = (
    'imeprezime status jmbg stalnaadresa privadresa brlk mup telefon dolazak odlazak ' +
    'od5 do5 jvp5 cp5 od6 do6 jvp6 cp6 od7 do7 jvp7 cp7 od8 do8 jvp8 cp8 ' +
    'od1 do1 vp1 od2 do2 vp2 od3 do3 vp3 od4 do4 vp4 ' + 
    'razdaljina cenag vrstag regbr ' + 
    'ostalo1 costalo1 ostalo2 costalo2 ostalo3 costalo3 ostalo4 costalo4'
).split(' ');

const G_FIELDS = 'program sifrap datump datumk poziv'.split(' ');

const DATE_FIELDS = 'datump datumk dolazak odlazak'.split(' ');

const SPV_FIELDS = (
    'od1 do1 vp1 od2 do2 vp2 od3 do3 vp3 od4 do4 vp4 ' + 
    'razdaljina cenag vrstag regbr'
).split(' ');

const JPV_FIELDS = 'od5 do5 jvp5 cp5 od6 do6 jvp6 cp6 od7 do7 jvp7 cp7 od8 do8 jvp8 cp8'.split(' ');

const DNEVNICA_MAP = {
    'Saradnik': 850*2,
    'Stručni': 850,
    'Mentor': 850*2,
    'Asistent': 850,
}

const single_row = d => `
<td>
    <button id="r-${d.id}-stampaj">Stampaj</button>
    <button id="r-${d.id}-brisi">Brisi</button>
</td>
<td><input type="text" name="r-${d.id}-imeprezime" id="r-${d.id}-imeprezime"></td>
<td>
    <select name="r-${d.id}-status" id="r-${d.id}-status">
        <option value="Saradnik">Saradnik predavac</option>
        <option value="Stručni">Stručni konsultant</option>
        <option value="Mentor">Mentor</option>
        <option value="Asistent">Asistent</option>
    </select>
</td>
<td><input type="text" name="r-${d.id}-jmbg" id="r-${d.id}-jmbg" size="13"></td>
<td><input type="text" name="r-${d.id}-stalnaadresa" id="r-${d.id}-stalnaadresa"></td>
<td><input type="text" name="r-${d.id}-privadresa" id="r-${d.id}-privadresa"></td>
<td><input type="text" name="r-${d.id}-brlk" id="r-${d.id}-brlk" size="10"></td>
<td><input type="text" name="r-${d.id}-mup" id="r-${d.id}-mup"></td>
<td><input type="tel" name="r-${d.id}-telefon" id="r-${d.id}-telefon" size="13"></td>
<td>
    <input type="datetime-local" name="r-${d.id}-dolazak" id="r-${d.id}-dolazak"><br>
    <button id="r-${d.id}-set-dolazak">Pocetak seminara</button>
</td>
<td>
    <input type="datetime-local" name="r-${d.id}-odlazak" id="r-${d.id}-odlazak"><br>
    <button id="r-${d.id}-set-odlazak">Kraj seminara</button>
</td>
<td><div style="width: max-content;">
    <input type="text" name="r-${d.id}-od5" id="r-${d.id}-od5" size="10">
    <input type="text" name="r-${d.id}-do5" id="r-${d.id}-do5" size="10">
    <select name="r-${d.id}-jvp5" id="r-${d.id}-jvp5">
        <option></option>
        <option value="Autobus">Autobus</option>
        <option value="Voz">Voz</option>
    </select>
    <input type="text" name="r-${d.id}-cp5" id="r-${d.id}-cp5" size="4"><br>
    <input type="text" name="r-${d.id}-od6" id="r-${d.id}-od6" size="10">
    <input type="text" name="r-${d.id}-do6" id="r-${d.id}-do6" size="10">
    <select name="r-${d.id}-jvp6" id="r-${d.id}-jvp6">
        <option></option>
        <option value="Autobus">Autobus</option>
        <option value="Voz">Voz</option>
    </select>
    <input type="text" name="r-${d.id}-cp6" id="r-${d.id}-cp6" size="4"><br>
    <input type="text" name="r-${d.id}-od7" id="r-${d.id}-od7" size="10">
    <input type="text" name="r-${d.id}-do7" id="r-${d.id}-do7" size="10">
    <select name="r-${d.id}-jvp7" id="r-${d.id}-jvp7">
        <option></option>
        <option value="Autobus">Autobus</option>
        <option value="Voz">Voz</option>
    </select>
    <input type="text" name="r-${d.id}-cp7" id="r-${d.id}-cp7" size="4"><br>
    <input type="text" name="r-${d.id}-od8" id="r-${d.id}-od8" size="10">
    <input type="text" name="r-${d.id}-do8" id="r-${d.id}-do8" size="10">
    <select name="r-${d.id}-jvp8" id="r-${d.id}-jvp8">
        <option></option>
        <option value="Autobus">Autobus</option>
        <option value="Voz">Voz</option>
    </select>
    <input type="text" name="r-${d.id}-cp8" id="r-${d.id}-cp8" size="4"> <br>
    <button id="r-${d.id}-jpv-brisi">Brisi sve</button>
</div></td>
<td><div style="width: max-content;">
    <input type="text" name="r-${d.id}-od1" id="r-${d.id}-od1" size="10">
    <input type="text" name="r-${d.id}-do1" id="r-${d.id}-do1" size="10">
    <select name="r-${d.id}-vp1" id="r-${d.id}-vp1">
        <option></option>
        <option value="Automobil">Automobil</option>
        <option value="Motocikl">Motocikl</option>
    </select><br>
    <input type="text" name="r-${d.id}-od2" id="r-${d.id}-od2" size="10">
    <input type="text" name="r-${d.id}-do2" id="r-${d.id}-do2" size="10">
    <select name="r-${d.id}-vp2" id="r-${d.id}-vp2">
        <option></option>
        <option value="Automobil">Automobil</option>
        <option value="Motocikl">Motocikl</option>
    </select><br>
    <input type="text" name="r-${d.id}-od3" id="r-${d.id}-od3" size="10">
    <input type="text" name="r-${d.id}-do3" id="r-${d.id}-do3" size="10">
    <select name="r-${d.id}-vp3" id="r-${d.id}-vp3">
        <option></option>
        <option value="Automobil">Automobil</option>
        <option value="Motocikl">Motocikl</option>
    </select><br>
    <input type="text" name="r-${d.id}-od4" id="r-${d.id}-od4" size="10">
    <input type="text" name="r-${d.id}-do4" id="r-${d.id}-do4" size="10">
    <select name="r-${d.id}-vp4" id="r-${d.id}-vp4">
        <option></option>
        <option value="Automobil">Automobil</option>
        <option value="Motocikl">Motocikl</option>
    </select><br>
    Ukupna razdaljina: <input type="text" name="r-${d.id}-razdaljina" id="r-${d.id}-razdaljina" size="5"> <br>
    Cena/Vrsta goriva: <input type="text" name="r-${d.id}-cenag" id="r-${d.id}-cenag" size="3">
    <input type="text" name="r-${d.id}-vrstag" id="r-${d.id}-vrstag" size="3"> <br>
    Registarski broj: <input type="text" name="r-${d.id}-regbr" id="r-${d.id}-regbr" size="5">
    <button id="r-${d.id}-spv-brisi">Brisi sve</button>
</div></td>
<td><div style="width: max-content;">
    <input type="text" name="r-${d.id}-ostalo1" id="r-${d.id}-ostalo1" size="10">
    <input type="text" name="r-${d.id}-costalo1" id="r-${d.id}-costalo1" size="5"> <br>
    <input type="text" name="r-${d.id}-ostalo2" id="r-${d.id}-ostalo2" size="10">
    <input type="text" name="r-${d.id}-costalo2" id="r-${d.id}-costalo2" size="5"> <br>
    <input type="text" name="r-${d.id}-ostalo3" id="r-${d.id}-ostalo3" size="10">
    <input type="text" name="r-${d.id}-costalo3" id="r-${d.id}-costalo3" size="5"> <br>
    <input type="text" name="r-${d.id}-ostalo4" id="r-${d.id}-ostalo4" size="10">
    <input type="text" name="r-${d.id}-costalo4" id="r-${d.id}-costalo4" size="5"> <br>
</div></td>
`

function new_saradnik() {
    const s = {
        id: "" + (+new Date()),
    };
    
    R_FIELDS.forEach(rf => {
        s[rf] = "";
    });
    
    return s;
}

let DATA = {
    'program': '',
    'sifrap': '',
    'datump': '',
    'datumk': '',
    'poziv': '',
    'saradnici': [new_saradnik()]
}

if (localStorage.getItem('sar-data') != null) {
    DATA = JSON.parse(localStorage.getItem('sar-data'));
}

function update() {
    G_FIELDS.forEach(gf => {
        DATA[gf] = document.getElementById(`g-${gf}`).value;
    });
    
    DATA.saradnici.forEach(sd => {
        R_FIELDS.forEach(rf => {
            sd[rf] = document.getElementById(`r-${sd.id}-${rf}`).value;
        })
    });
    
    render();
}

function novi_saradnik() {
    DATA.saradnici.push(new_saradnik());
    render(true);
}

function stampaj_validate(forma) {
    return true;
}

function reset_seminar() {
    DATA.datump = "";
    DATA.datumk = "";
    DATA.sifrap = "";
    
    DATA.saradnici.forEach(sr => {
        sr.dolazak = "";
        sr.odlazak = "";
    });
    
    render();
}

function set_saradnik_start(s_id) {
    const sr = get_saradnik_by_id(s_id);
    sr.dolazak = DATA.datump + "T12:00";
    render();
}

function set_saradnik_end(s_id) {
    const sr = get_saradnik_by_id(s_id);
    sr.odlazak = DATA.datumk + "T12:00";
    render();
}

function get_saradnik_by_id(s_id) {
    return DATA.saradnici.filter(x => x.id == s_id)[0];
}

function stampaj_saradnik(s_id) {
    let s_data = get_saradnik_by_id(s_id);
    
    let formdata = {};
    
    G_FIELDS.forEach(gf => {
        if (!DATE_FIELDS.includes(gf)) {
            formdata[gf] = DATA[gf];
        }
    });
    
    R_FIELDS.forEach(rf => {
        if (!DATE_FIELDS.includes(rf)) {
            formdata[rf] = s_data[rf];
        }
    })
    
    function date_transform(old_value, new_postfix) {
        let oldv = new Date(old_value);
        if (oldv.getDate() != oldv.getDate()) {
            formdata['dan' + new_postfix] = "";
            formdata['mesec' + new_postfix] = "";
            formdata['god' + new_postfix] = "";
            return null;
        } else {
            formdata['dan' + new_postfix] = oldv.getDate();
            formdata['mesec' + new_postfix] = oldv.getMonth() + 1;
            formdata['god' + new_postfix] = oldv.getFullYear();
            return oldv;
        }
    }

    function time_transform(old_value, new_postfix) {
        let oldv = date_transform(old_value, new_postfix);
        if (oldv === null) {
            formdata['sat' + new_postfix] = "";
            formdata['min' + new_postfix] = "";
        } else {
            formdata['sat' + new_postfix] = oldv.getHours();
            formdata['min' + new_postfix] = oldv.getMinutes();
        }
        return oldv;
    }
    
    date_transform(DATA.datump, 'trajanje');
    date_transform(DATA.datumk, 'trajanjedo');

    let dol = time_transform(s_data.dolazak, 'dolaska');
    let odl = time_transform(s_data.odlazak, 'odlaska');
    
    formdata.brojcasova = Math.floor((odl-dol)/(1000*60*60));
    formdata.dnevnica = DNEVNICA_MAP[formdata.status];
    
    formdata.akontacija = "";
    formdata.dana = new Date().getDate();
    formdata.meseca = new Date().getMonth() + 1;
    formdata.gode = new Date().getFullYear();
    
    if (!stampaj_validate(formdata)) {
        return;
    }
    
    const sumbitForm = document.getElementById('submit-form');
    sumbitForm.innerHTML = '';
    
    for (const key in formdata) {
        if (Object.hasOwnProperty.call(formdata, key)) {
            const value = formdata[key];
            
            const elem = document.createElement('input');
            elem.type = 'hidden';
            elem.value = value;
            elem.name = key;
            sumbitForm.appendChild(elem);
        }
    }
    
    sumbitForm.submit();
}

function save_data() {
    localStorage.setItem('sar-data', JSON.stringify(DATA));
}

function brisi_saradnik(rm_id, rm_ime) {
    if (!confirm("Sigurno obrisati saradnika " + rm_ime + "?")) {
        return;
    }
    
    DATA.saradnici = DATA.saradnici.filter(x => x.id != rm_id);
    render(true);
}

function opt_set(field_id, value) {
    const fld = document.getElementById(field_id);
    if (fld.value == "") {
        fld.value = value;
    }
}

function brisi_spv(s_id) {
    const data = get_saradnik_by_id(s_id);
    SPV_FIELDS.forEach(f => data[f] = "");
    render();
}

function brisi_jpv(s_id) {
    const data = get_saradnik_by_id(s_id);
    JPV_FIELDS.forEach(f => data[f] = "");
    render();
}

function render(full) {
    save_data();
    G_FIELDS.forEach(gf => {
        let vv = document.getElementById(`g-${gf}`);
        vv.value = DATA[gf];
        vv.onchange = () => update();
    });
    
    const tb = document.getElementById('table-body');
    
    if (full) {
        tb.innerHTML = '';
    }
    
    DATA.saradnici.forEach(sd => {
        const tr = document.createElement('tr');
        if (full) {
            tr.innerHTML = single_row(sd);
            tb.appendChild(tr);
        }
        
        document.getElementById(`r-${sd.id}-stampaj`).onclick = () => stampaj_saradnik(sd.id);
        document.getElementById(`r-${sd.id}-brisi`).onclick = () => brisi_saradnik(sd.id, sd.imeprezime);
        document.getElementById(`r-${sd.id}-set-dolazak`).onclick = () => set_saradnik_start(sd.id);
        document.getElementById(`r-${sd.id}-set-odlazak`).onclick = () => set_saradnik_end(sd.id);
        document.getElementById(`r-${sd.id}-jpv-brisi`).onclick = () => brisi_jpv(sd.id);
        document.getElementById(`r-${sd.id}-spv-brisi`).onclick = () => brisi_spv(sd.id);
        
        R_FIELDS.forEach(rf => {
            const ie = document.getElementById(`r-${sd.id}-${rf}`);
            ie.value = sd[rf];
            ie.onchange = () => {
                if (rf == 'od5') {
                    opt_set(`r-${sd.id}-do5`, 'Valjevo');
                    opt_set(`r-${sd.id}-od6`, 'Valjevo');
                    opt_set(`r-${sd.id}-do6`, ie.value);
                } else if (rf == 'jvp5') {
                    opt_set(`r-${sd.id}-jvp6`, ie.value);
                } else if (rf == 'od1') {
                    opt_set(`r-${sd.id}-do1`, 'Valjevo');
                    opt_set(`r-${sd.id}-od2`, 'Valjevo');
                    opt_set(`r-${sd.id}-do2`, ie.value);
                } else if (rf == 'vp1') {
                    opt_set(`r-${sd.id}-vp2`, ie.value);
                }
                update();
            };
        });
    });
}