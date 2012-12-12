var cah_models = {};
var test = test || function() {};
(function() {



    /**
       A simple rand function
    */
    function rand(size, random_function) {
        random_function = random_function || Math.random;
        return Math.ceil(size * random_function());
    }

    test(
        "test rand",
        function() {
            mock_random = function() {
                return 0.245;
            }

            equal(
                rand(30, mock_random),
                8,
                "rand() did not work"
            )
        }
    );


    /**
       An implementation of reduce
    */


    function reduce(array, initial, callback) {
        var ret = initial
        for(var i = 0; i < array.length; i++) {
            ret = callback(ret, array[i]);
        }
        return ret
    }

    test(
        "reduce test",
        function() {
            var result = reduce(
                [1,2,3],
                0,
                function(accum, x) {
                    return accum + x;
                }
            );
            equal(
                result,
                6,
                "reduce can add"
            );
        }
    );

    /**
       A rudimentary ordered set
       this will be used to simulate a deck.

       It has the following invariant:

       1. The set is ordered by insert order
       2. Multiple inserts of the same element does not grow the set
       3. Multiple inserts of the same element does not change
          the position of the element

       An ordered set is a perfect data structure for modeling a card
       deck.  All cards are unique entities, so they have unique
       identities. All cards exist at a position until they are
       removed from a deck.

    */
    function ordset() {
        return [];
    }

    ordset.add = function(set_data, element) {
        if(set_data.indexOf(element) == -1) {
            set_data.push(element)
        }
        return set_data
    }

    test("ordset.add", function() {
        var set = ordset();
        set = ordset.add(set, "a"),

        ok(
            ordset.exists(set, "a"),
            "'a' was not added to the set"
        )

    });

    test(
        "ordset.add; multiple adds do not change the size",
        function() {
            var set = ordset();
            ordset.add(set, "a");
            ordset.add(set, "a");
            ordset.add(set, "a");

            equal(
                ordset.size(set),
                1
            );
        }
    );

    test(
        "ordset.add; multiple adds dose not change the position the element",
        function() {
            var set = ordset();
            ordset.add(set, "a");
            ordset.add(set, "b");
            ordset.add(set, "a");
            ordset.add(set, "a");

            equal(
                ordset.element_at(set, 0),
                "a"
            );
        }
    );


    ordset.remove = function(set_data, element) {
        var i = set_data.indexOf(element);
        if(i >= 0) {
            set_data.splice(i, 1);
        }
        return set_data;
    }

    test(
        "ordset.remove",
        function() {
            var set = ordset();
            set = ordset.add(
                set,
                "a"
            )

            set = ordset.remove(
                set,
                "a"
            )

            ok(
                !ordset.exists(set, "a"),
                "element was not removed"
            );

            set = ordset.remove(
                set,
                "a"
            )

            ok(
                !ordset.exists(set, "a"),
                "element is still removed"
            );

        }
    );

    ordset.exists = function(set_data, element) {
        return set_data.indexOf(element) >= 0;
    }

    test(
        "ordset.exists",
        function() {
            var set = ordset();
            set = ordset.add(set, "a");
            ok(
                ordset.exists(
                    set,
                    "a"
                )
            );
        }
    )

    ordset.size = function(set_data) {
        return set_data.length;
    }

    test(
        "ordset.size",
        function() {
            var set = ordset();
            size0 = ordset.size(set);
            set = ordset.add(set, "a");
            size1 = ordset.size(set);
            set = ordset.add(set, "b");
            size2 = ordset.size(set);
            set = ordset.add(set, "c");
            size3 = ordset.size(set);

            equal(
                size0,
                0
            );

            equal(
                size1,
                1
            );

            equal(
                size2,
                2
            );

            equal(
                size3,
                3
            );
        }
    );

    ordset.element_at = function(set_data, i) {
        return set_data[i];
    }

    test(
        "ordset.element_at",
        function() {
            var set = ordset();
            set = ordset.add(set, "a");
            set = ordset.add(set, "b");
            set = ordset.add(set, "c");

            equal(
                ordset.element_at(set, 0),
                "a"
            );

            equal(
                ordset.element_at(set, 1),
                "b"
            );

            equal(
                ordset.element_at(set, 2),
                "c"
            );
        }
    );

    // Exports
    cah_models.ordset = ordset;
    cah_models.rand = rand;
    cah_models.reduce = reduce;

})();
