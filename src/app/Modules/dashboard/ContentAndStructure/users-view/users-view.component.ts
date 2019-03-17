import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { UserService } from 'src/app/Shared/Services/User/user.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/Shared/Model/UserModel/user-model';
import { jqxButtonComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxDropDownButtonComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownbutton';
import { jqxDockingLayoutComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdockinglayout';
import { jqxListBoxComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';
import { jqxGridComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements AfterViewInit {
  
  source: any[] = [{
    label: "Peppermint Hot Chocolate",
    value: "Chocolate Beverage",
    group: "Hot Chocolate"
}, {
    label: "Salted Caramel Hot Chocolate",
    value: "Chocolate Beverage",
    group: "Hot Chocolate"
}, {
    label: "White Hot Chocolate",
    value: "Chocolate Beverage",
    group: "Hot Chocolate"
}, {
    label: "Caffe Americano",
    value: "Espresso Beverage",
    group: "Espresso"
}, {
    label: "Caffe Latte",
    value: "Espresso Beverage",
    group: "Espresso"
}, {
    label: "Caffe Mocha",
    value: "Espresso Beverage",
    group: "Espresso"
}, {
    label: "Cappuccino",
    value: "Espresso Beverage",
    group: "Espresso"
}];

  ngAfterViewInit(): void {

    this.userService.getUsers().subscribe((result : any) => 
    {
      debugger;
      this.users = result;
      // result.forEach(element =>
      //    {
      //     this.users.
      // });

  });

  }

  constructor(private userService: UserService) { }
  users:any;

  public lineItemColumns: any[] = [
    { text: 'Code', datafield: 'Code' },
    { text: 'Description', datafield: 'Description' },
    { text: 'Quantity', datafield: 'Quantity' }
];
public lineItemsSource: any = {
    datatype: 'array',
    // localdata: this.lineItems,
    localdata: [
        { "Code": "Codeeeee", "Description": "Descccccc", "Quantity": "Quantityyyyy" }
    ],
    datafields: [
        { name: 'Code', type: 'string' },
        { name: 'Description', type: 'string' },
        { name: 'Quantity', type: 'float' }
    ]
};

public lineItemsDataAdapter: any = new jqx.dataAdapter(this.lineItemsSource);
@ViewChild('lineItemsGridReference')
public lineItemsGridRef: jqxGridComponent;
@ViewChild('myDockingLayout') myDockingLayout: jqxDockingLayoutComponent;
@ViewChild('lineitems-grid-container2')
public jButtonRef: jqxButtonComponent;


  ngOnInit() {

    this.userService.getUsers().subscribe((result : any) => 
    {
      debugger;
      this.users = result;
      // result.forEach(element =>
      //    {
      //     this.users.
      // });

  });

  this.loadDynamicWindow("Users");
  }

  

  loadDynamicWindow(name) {
    var window = 
    {
        type: 'floatGroup',
        width: 300,
        height: 300,
        position: { x: 1000, y: 150 },
        
        items: [{
            type: 'layoutPanel',
            title: name,
           contentContainer: "Window1", 
           initContent: () => {
            var variable = jqwidgets.createInstance('#lineitems-grid-container', 'jqxGrid', {
                // theme: this.theme,
                width: '30%',
                height: '20%',
                source: this.lineItemsSource,
                columns: this.lineItemColumns,
                sortable: true,
                altrows: true,
                editable: false
            });

            var variabled = jqwidgets.createInstance('#lineitems-grid-container2', 'jqxButton', {
                // theme: this.theme,
                width: '10%',
                height: '10%',
                value: 'Click me'
            });
            variabled.addEventHandler('click', event => {
                alert();
            });
        }
        }]
    }
    var savelay = this.myDockingLayout.saveLayout();
    savelay[0].items.push(window);
    this.myDockingLayout.loadLayout(savelay);
}

}
