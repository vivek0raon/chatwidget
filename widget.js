(function() {
  var YourChatWidget = {
    init: function(customerId) {
      this.customerId = customerId;
      this.createWidgetContainer();
      this.loadChatInterface();
      this.conversationState = 'initial';
    },

    createWidgetContainer: function() {
      var container = document.createElement('div');
      container.id = 'your-chat-widget';
      container.style.position = 'fixed';
      container.style.bottom = '20px';
      container.style.right = '20px';
      container.style.width = '300px';
      container.style.backgroundColor = 'white';
      container.style.border = '1px solid #ccc';
      container.style.borderRadius = '10px';
      container.style.overflow = 'hidden';
      document.body.appendChild(container);
    },

    loadChatInterface: function() {
      var button = document.createElement('button');
      button.textContent = 'How can I help you?';
      button.onclick = this.openChat.bind(this);
      button.style.width = '100%';
      button.style.padding = '10px';
      button.style.backgroundColor = '#007bff';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      document.getElementById('your-chat-widget').appendChild(button);
    },

    openChat: function() {
      document.getElementById('your-chat-widget').innerHTML = '';
      this.createChatInterface();
      this.displayOptions(this.getInitialOptions());
    },

    createChatInterface: function() {
      var chatInterface = document.createElement('div');
      chatInterface.innerHTML = `
        <div id="chat-messages" style="height: 300px; overflow-y: auto; padding: 10px;"></div>
        <div id="chat-options" style="padding: 10px;"></div>
      `;
      document.getElementById('your-chat-widget').appendChild(chatInterface);
    },

    displayMessage: function(message, isUser = false) {
      var messageElement = document.createElement('div');
      messageElement.textContent = message;
      messageElement.style.marginBottom = '10px';
      messageElement.style.padding = '5px';
      messageElement.style.borderRadius = '5px';
      messageElement.style.maxWidth = '80%';
      if (isUser) {
        messageElement.style.backgroundColor = '#007bff';
        messageElement.style.color = 'white';
        messageElement.style.marginLeft = 'auto';
      } else {
        messageElement.style.backgroundColor = '#f1f1f1';
      }
      document.getElementById('chat-messages').appendChild(messageElement);
      document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    },

    displayOptions: function(options) {
      var optionsContainer = document.getElementById('chat-options');
      optionsContainer.innerHTML = '';
      options.forEach(option => {
        var button = document.createElement('button');
        button.textContent = option.text;
        button.onclick = () => this.handleOptionClick(option);
        button.style.display = 'block';
        button.style.width = '100%';
        button.style.padding = '10px';
        button.style.marginBottom = '5px';
        button.style.backgroundColor = '#f1f1f1';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        optionsContainer.appendChild(button);
      });
    },

    handleOptionClick: function(option) {
      this.displayMessage(option.text, true);
      this.conversationState = option.nextState;
      this.displayMessage(option.response);
      this.displayOptions(this.getOptions());
    },

    getInitialOptions: function() {
      return [
        { text: "I'm looking to rent an apartment", nextState: 'apartment', response: "Great! Let's find you an apartment. What's your budget range?" },
        { text: "I'm looking to rent a house", nextState: 'house', response: "Excellent! We'll help you find a house. How many bedrooms do you need?" }
      ];
    },

    getOptions: function() {
      switch(this.conversationState) {
        case 'apartment':
          return [
            { text: "Under $1000/month", nextState: 'apartment_location', response: "Got it. And in which area are you looking to rent?" },
            { text: "$1000-$2000/month", nextState: 'apartment_location', response: "Understood. Which area are you interested in?" },
            { text: "Over $2000/month", nextState: 'apartment_location', response: "Alright. What's your preferred location?" }
          ];
        case 'house':
          return [
            { text: "1-2 bedrooms", nextState: 'house_location', response: "Noted. And where would you like this house to be located?" },
            { text: "3-4 bedrooms", nextState: 'house_location', response: "Great. Which area are you considering for this house?" },
            { text: "5+ bedrooms", nextState: 'house_location', response: "Excellent. Do you have a specific location in mind for this large house?" }
          ];
        case 'apartment_location':
        case 'house_location':
          return [
            { text: "Downtown", nextState: 'end', response: "Perfect! I'll compile a list of options in the downtown area and get back to you soon. Is there anything else you'd like to specify?" },
            { text: "Suburbs", nextState: 'end', response: "Great choice! I'll put together some options in the suburban areas. Any other preferences you want to mention?" },
            { text: "Other", nextState: 'end', response: "Certainly! I'll look into various locations. Could you provide any other details about your ideal rental property?" }
          ];
        case 'end':
          return [
            { text: "Yes, I have more questions", nextState: 'initial', response: "Of course! Let's start over. How else can I help you?" },
            { text: "No, that's all for now", nextState: 'close', response: "Alright! I'll work on finding the best options for you based on our conversation. Expect to hear back from us soon. Have a great day!" }
          ];
        case 'close':
          return [];
        default:
          return this.getInitialOptions();
      }
    }
  };

  window.YourChatWidget = YourChatWidget;
})();
