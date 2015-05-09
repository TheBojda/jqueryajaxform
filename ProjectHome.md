Simple, small (1.3K) ajax form implementation based on jQuery.

**Usage:** Simply add ajaxform class, and a hidden input with "ajaxform\_refresh" name which contains the ids of elements have to be refreshed. After the form submit, only the given fields will be refreshed, instead of the whole page. You don't have to change anything on the server side, but it is possible to give back only the referenced parts of the result to reduce the bandwidth usage, and usage of server resources.

**How dose it work:** The ajaxform utility is a small script based on jQuery which search the forms with ajaxform classes, and changes the target of these to a hidden iframe. After the form submit the script will copy back the given elements to the original HTML. This method prevents the ugly page refreshes, and makes easier to do some magic, like change a simple text part to textarea, or build dynamic ajax trees and tables without javascript components or special server codes.

Example:

```
  <script type="text/javascript" src="ajaxform.js" />

  ...

  <span id="content">
    <form method="post" class="ajaxform">
      <input type="hidden" name="ajaxform_refresh" value="content" />
      ...
      <input type="submit" name="submit_button" value="Submit!" />
    </form>
    ...
  </span>
```

**Unobtrusive javascript with ajaxform:** Using unobtrusive javascripts with the ajaxform needs some extra programming, because these should run only on the original HTML page. If these scripts would be in the header, like in the standard solution, the DOM would be changed in the iframe, and this changed DOM would be copied back to the original page. This mechanism kills the attached event handlers. For this reason all of these scripts have to be placed in the ajaxform\_init function which will be called after every refresh. When javascript loading is needed, use $.geScript() jQuery function.

Example:

```
  <script type="text/javascript">
    function ajaxform_init() {
      // load javascript instead of <script src=...
      $.getScript('some_unobtrusive_javascript.js');
      
      // jQuery event handler instead of $(document).ready() 
      $('#some_button').click(function() {
        $('#popup').fadeIn('slow');
      });
    }
  </script>
```

If you have any question, write me a mail to thebojda AT gmail DOT com.

&lt;wiki:gadget url="http://www.ohloh.net/p/486104/widgets/project\_users\_logo.xml" height="43" border="0"/&gt;

<a href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LMQGC6YTEQKE4&item_name=Beer'>
<img src='http://www.paypal.com/en_US/i/btn/x-click-but04.gif' /><br />Buy me some beer if you like my code ;)</a>

If you like the code, look at my other projects on http://code.google.com/u/TheBojda/.

If you have any question, please feel free to contact me at thebojda AT gmail DOT com.