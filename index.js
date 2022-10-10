const R_FIELDS = (
    'imeprezime status jmbg stalnaadresa privadresa brlk mup telefon dolazak odlazak ' +
    'od5 do5 jvp5 cp5 od6 do6 jvp6 cp6 od7 do7 jvp7 cp7 od8 do8 jvp8 cp8 ' +
    'od1 do1 vp1 od2 do2 vp2 od3 do3 vp3 od4 do4 vp4 ' +
    'razdaljina cenag vrstag regbr'
    //'ostalo1 costalo1 ostalo2 costalo2 ostalo3 costalo3 ostalo4 costalo4'
).split(' ');

const G_FIELDS = 'program sifrap datump datumk poziv'.split(' ');

const DATE_FIELDS = 'datump datumk dolazak odlazak'.split(' ');

const SPV_FIELDS = (
    'od1 do1 vp1 od2 do2 vp2 od3 do3 vp3 od4 do4 vp4 ' +
    'razdaljina cenag vrstag regbr'
).split(' ');

const JPV_FIELDS = 'od5 do5 jvp5 cp5 od6 do6 jvp6 cp6 od7 do7 jvp7 cp7 od8 do8 jvp8 cp8'.split(' ');

const DNEVNICA_MAP = {
    'Saradnik': 850 * 2,
    'Stručni': 850,
    'Mentor': 850 * 2,
    'Asistent': 850,
    'Rukovodilac': 850 * 2,
}

let TEMPLATE = '';

function load_template() {
    const e = document.getElementById('table-body');
    TEMPLATE = e.innerHTML;
    e.innerHTML = '';
}

const single_row = d => {
    return TEMPLATE.replace(/\$\{d\.id\}/g, d.id);
};

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
    update_saradnici();
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

    formdata.brojcasova = Math.floor((odl - dol) / (1000 * 60 * 60));
    formdata.dnevnica = DNEVNICA_MAP[formdata.status];

    if (s_data.status == "Rukovodilac") {
        formdata.status = "Stručni"
        formdata.poziv = "Jelena Gledić"
        formdata.brojcasova = Math.floor(formdata.brojcasova * 2.5);
    }

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
    update_saradnici();
    localStorage.setItem('sar-data', JSON.stringify(DATA));
}

function brisi_saradnik(rm_id, rm_ime) {
    if (!confirm("Sigurno obrisati saradnika " + rm_ime + "?")) {
        return;
    }

    DATA.saradnici = DATA.saradnici.filter(x => x.id != rm_id);
    update_saradnici();
    render(true);
}

function update_saradnici() {
    const $tr_izabrani = document.getElementById('trenutni-saradnik');
    const trenutni = $tr_izabrani.value;
    
    $tr_izabrani.innerHTML = '';
    DATA.saradnici.forEach(x => {
        const op = document.createElement('option');
        op.value = x.id;
        op.innerText = x.imeprezime + "(" + x.id + ")";
        $tr_izabrani.appendChild(op);
    });
    
    $tr_izabrani.value = trenutni;
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

function render() {
    save_data();
    G_FIELDS.forEach(gf => {
        let vv = document.getElementById(`g-${gf}`);
        vv.value = DATA[gf];
        vv.onchange = () => update();
    });

    const tb = document.getElementById('table-body');

    tb.innerHTML = '';
    
    const $tr_izabrani = document.getElementById('trenutni-saradnik');

    DATA.saradnici.forEach(sd => {
        const tr = document.createElement('div');
        tr.innerHTML = single_row(sd);
        tb.appendChild(tr);
        if (sd.id != $tr_izabrani.value) {
            tr.style.display = "none";
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

function saradnik_export() {
    let dataStr = JSON.stringify(DATA);

    let elem = document.createElement('a');
    elem.href = 'data:text/json;charset=utf-8,' + encodeURI(dataStr);
    elem.target = "_blank";
    elem.download = "putnigen-export.json";
    elem.click();
}

function saradnik_import() {
    alert('not implemented yet')
}