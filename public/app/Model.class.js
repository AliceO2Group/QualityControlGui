class Model extends Observable {
  constructor() {
    super();

    this.state = {
      count: 0,
      sidebar: true,
      searchInput: null,
      layout: 3,
      zoom: 3,
      collections: [
        {name: 'PWG-HF', owner: 'Francesco Prino'},
        {name: 'PWG-GA', owner: 'Yuri Kharlov'},
        {name: 'AliRoot dashboard', owner: 'Alina Gabriela Grigoras'},
        {name: 'PWG-CF', owner: 'Michael Weber'},
        {name: 'PWG-PP', owner: 'Ruben Shahoyan'},
        {name: 'Run Coordination', owner: 'Barthelemy Von Haller'},
        {name: 'PWG-LF', owner: 'Lee Barnby '},
        {name: 'PWG-DQ', owner: 'Giuseppe Bruno'},
        {name: 'PWG-JE', owner: 'Marco Van Leeuwen'},
        {name: 'MC productions', owner: 'Marco Van Leeuwen'},
        {name: 'Run Coordination 2017', owner: 'Grazia Luparello'},
        {name: 'O2 Milestones', owner: 'Vasco Chibante Barroso'},
        {name: 'O2 TDR', owner: 'Barthelemy Von Haller'},
        {name: 'MC productions dashboard', owner: 'Catalin-Lucian Ristea'},
        {name: 'DAQ System Dashboard', owner: 'Barthelemy Von Haller '},
        {name: 'PWG-LF (2)', owner: 'Lee Barnby'},
      ],
      objects: [
        'DAQ01/EquipmentSize/ACORDE/ACORDE',
        'DAQ01/EquipmentSize/CPV/CPV',
        'DAQ01/EquipmentSize/HMPID/HMPID',
        'DAQ01/EquipmentSize/ITSSDD/ITSSDD',
        'DAQ01/EquipmentSize/ITSSSD/ITSSSD',
        'DAQ01/EquipmentSize/TOF/TOF',
        'DAQ01/EquipmentSize/TPC/TPC',
        'DAQ01/EventSize/ACORDE/ACORDE',
        'DAQ01/EventSize/CPV/CPV',
        'DAQ01/EventSize/HMPID/HMPID',
        'DAQ01/EventSize/ITSSDD/ITSSDD',
        'DAQ01/EventSize/ITSSSD/ITSSSD',
        'DAQ01/EventSize/TOF/TOF',
        'DAQ01/EventSize/TPC/TPC',
        'DAQ01/EventSizeClasses/class_C0AMU-ABC',
        'DAQ01/EventSizeClasses/class_C0ALSR-ABC',
        'DAQ01/EventSizeClasses/class_C0OB3-ABC',
        'DAQ01/_EquimentSizeSummmary',
        'DAQ01/_EventSizeClusters',
        'DAQ01/_EventSizeSummary',
        'TOFQAshifter/Default/hTOFRRawHitMap',
        'TOFQAshifter/Default/hTOFRRawTimeVsTRM035',
        'TOFQAshifter/Default/hTOFRRawTimeVsTRM3671',
        'TOFQAshifter/Default/hTOFRRaws',
        'TOFQAshifter/Default/hTOFRRawsTime',
        'TOFQAshifter/Default/hTOFRRawsToT',
        'TOFQAshifter/Default/hTOFrefMap',
        'TST01/Default/hTOFRRawHitMap',
        'TST01/Default/hTOFRRawTimeVsTRM035',
        'TST01/Default/hTOFRRawTimeVsTRM3671',
        'TST01/Default/hTOFRRaws',
        'TST01/Default/hTOFRRawsTime',
        'TST01/Default/hTOFRRawsToT',
        'TST01/Default/hTOFrefMap',
      ],
      currentTab: null,
      tabs: [
        {
          name: 'SDD',
          charts: [
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
          ],
        },
        {
          name: 'SPD',
          charts: [
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
          ],        },
        {
          name: 'TOF',
          charts: [
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
          ],        },
        {
          name: 'T0_beam',
          charts: [
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
          ],        },
        {
          name: 'MUON',
          charts: [
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
            `https://vcap.me:8443/api/retrieve?token=${token}&agentName=daqTask&objectName=PayloadSizeSubBlocks`,
          ],        },
      ],
    };

    this.state.currentTab = this.state.tabs[1];

    // this.load();

    this.inc = this.inc.bind(this);
    this.count = this.count.bind(this);

    document.body.addEventListener('keydown', this.onKeydown.bind(this));
  }

  onKeydown(e) {
    console.log(`e.keyCode=${e.keyCode}, e.metaKey=${e.metaKey}, e.ctrlKey=${e.ctrlKey}, e.altKey=${e.altKey}`);

    // don't listen to keys when it comes from an input (they transform into letters)
    // except spacial ones which are not chars
    // http://www.foreui.com/articles/Key_Code_Table.htm
    if (e.target.tagName.toLowerCase() === 'input' && e.keyCode > 47) {
      return;
    }

    // shortcuts
    switch (e.keyCode) {
      case 83: // s
        this.sidebar(!this.sidebar());
        e.preventDefault();
        break;
      case 70: // f
        if (e.metaKey || e.ctrlKey) this.sidebar(true);
        e.preventDefault();
        break;
      case 27: // esc
        this.sidebar(false);
        e.preventDefault();
        break;
    }
  }

  retrieve() {
    const params = new URLSearchParams();
    params.set('token', token);
    params.set('agentName', 'daqTask');
    params.set('objectName', 'PayloadSizeSubBlocks');

    return fetch('/api/retrieve?' + params.toString(), {method: 'POST'})
      .then(res => res.text())
      // .then(txt => JSROOT.parse(txt));
  }

  load() {
    this.retrieve()
      .then(json => this.chart(json))
      .then(json => this.notify());
  }

  inc() {
    this.state.count++;
    this.notify();
  }

  count(value) {
    if (arguments.length) {
      this.state.count = value;
      this.notify();
    }
    return this.state.count;
  }

  charts(value) {
    if (arguments.length) {
      this.state.charts = value;
      this.notify();
    }
    return this.state.charts;
  }

  tabs(value) {
    if (arguments.length) {
      this.state.tabs = value;
      this.notify();
    }
    return this.state.tabs;
  }

  currentTab(value) {
    if (arguments.length) {
      this.state.currentTab = value;
      this.notify();
    }
    return this.state.currentTab;
  }

  layout(value) {
    if (arguments.length) {
      this.state.layout = value;
      this.notify();
    }
    return this.state.layout;
  }

  sidebar(value) {
    if (arguments.length) {
      this.state.sidebar = value;
      this.notify();
    }
    return this.state.sidebar;
  }

  searchInput(value) {
    if (arguments.length) {
      this.state.searchInput = value;
      this.notify();
    }
    return this.state.searchInput;
  }

  // Diviser, 1 = entire screen, 3 = smaller
  zoom(value) {
    if (arguments.length) {
      if (value < 1) {
        value = 1;
      }
      if (value > 4) {
        value = 4;
      }
      this.state.zoom = value;
      this.notify();
    }
    return this.state.zoom;
  }

  searchResult() {
    if (!this.state.searchInput) {
      return null;
    }

    var result = {};
    result.collections = this.state.collections.filter(collection => collection.name.indexOf(this.state.searchInput) >= 0);
    result.objects = this.state.objects.filter(object => object.indexOf(this.state.searchInput) >= 0);
    return result;
  }

  get(property) {
    return this.state[property];
  }
}
