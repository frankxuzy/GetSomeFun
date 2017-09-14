// budgetController module
var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};



	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function(type, des, val) {
			var newItem, ID;
			//Create new ID
			//[1,2,4,6,8] next should be 9
			
			if(data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
			

			//Create new Item based on exp or inc
			if(type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}
			
			//add new data to our data object.
			data.allItems[type].push(newItem);

			//return the new Item
			return newItem; 
		},

		testing: function() {
			console.log(data);
		}
	}; 

})();



// UI controller module
var UIController = (function() {

	var DOMString = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	}

	return {
		getinput: function(){
			return {
				type: document.querySelector(DOMString.inputType).value,
				description: document.querySelector(DOMString.inputDescription).value,
				value: document.querySelector(DOMString.inputValue).value
				};  
		},

		addListItem: function(obj, type) {
			var html, newHtml, element;
			// Create HTML string with placeholder text
			if (type === 'inc') {
				element = DOMString.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMString.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}
			
			// Replace the placeholder text with some actual data			
			newHtml = html.replace('%id%', obj.id);
			// rewrite newHtml with html
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%',  obj.value);

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

		},

		getDOMstrings: function(){
			return DOMString;
		}
}

})();



// App controller
var controller = (function(budgetCtrl, UICtrl){

	var setupEventListeners = function() {
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event){

			// to show the event object of a key. 
			// console.log(event);
			if (event.keyCode === 13 || event.which === 13) {
				console.log('enter clicked');
				ctrlAddItem();
			}

		});
	};



	var ctrlAddItem = function() {
		var input, newItem;

		// 1. Get the field input data
		input = UICtrl.getinput();
		console.log(input);
		// 2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		// 3. Add the item to the UT
		UICtrl.addListItem(newItem, input.type);
		// 4. Calculate the budget

		// 5. Display the budget on the UI
	};

	return {
		init: function() {
			console.log('Application has started.')
			setupEventListeners();
		}
	}


})(budgetController, UIController);


controller.init();


